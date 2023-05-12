from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ClaseModel, ProfesorModel
from sqlalchemy import func, desc

class Clase(Resource):
    def get(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        return clase.to_json()

    def delete(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        db.session.delete(clase)
        db.session.commit()
        return "", 204
        
    def put(self,id):
        clase=db.session.query(ClaseModel).get_or_404(id)
        data=request.get_json().items()
        for key, value in data:
            setattr(clase, key, value)
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201
    
class Clases(Resource):
    def get(self):
        clases=db.session.query(ClaseModel).all()
        return jsonify([clase.to_json() for clase in clases])
     
    def post(self):
        clases=ClaseModel.from_json(request.get_json())
        print(clases)
        try:
            db.session.add(clases)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return clases.to_json(), 201


 ########################################################################   
class ProfesoresClases(Resource):
    def get(self):
        proclas=db.session.query(ClaseModel).all()
        return jsonify([procla.to_json() for procla in proclas])
            
    def post(self):
        proclas=ClaseModel.from_json(request.get_json())
        db.session.add(proclas)
        db.session.commit()
        return proclas.to_json(), 201

class ProfesorClase(Resource):
    def get(self,dni):
        procla=db.session.query(ClaseModel).get_or_404(dni)
        return procla.to_json()

    def delete(self,dni):
        procla=db.session.query(ClaseModel).get_or_404(dni)
        db.session.delete(procla)
        db.session.commit()
        return "", 204
        
    def put(self,dni):
        clase=db.session.query(ClaseModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(clase, key, value)
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201