from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ClaseModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Clase(Resource):

    @jwt_required(optional=True)
    def get(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        return clase.to_json()

    @role_required(roles=["admin"])
    def delete(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        db.session.delete(clase)
        db.session.commit()
        return "", 204
    
    @role_required(roles=["admin"])
    def put(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        data=request.get_json().items()
        for key, value in data:
            setattr(clase, key, value)
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201
    
class Clases(Resource):
    @jwt_required(optional=True)
    def get(self):
        clases=db.session.query(ClaseModel).all()
        return jsonify([clase.to_json() for clase in clases])
    
    @role_required(roles=["admin"])
    def post(self):
        clases=ClaseModel.from_json(request.get_json())
        print(clases)
        try:
            db.session.add(clases)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return clases.to_json(), 201