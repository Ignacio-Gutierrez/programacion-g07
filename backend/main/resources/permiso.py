from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PermisoModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

    
class Permisos(Resource):
       
    @role_required(roles=["admin"])
    def post(self):
        permisos=PermisoModel.from_json(request.get_json())
        print(permisos)
        try:
            db.session.add(permisos)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return permisos.to_json(), 201
class Permiso(Resource):

    def put(self,id):
        permiso=db.session.query(PermisoModel).get_or_404(id)
        data=request.get_json().items()
        for key, value in data:
            setattr(permiso, key, value)
        db.session.add(permiso)
        db.session.commit()
        return permiso.to_json(), 201