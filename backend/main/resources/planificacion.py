from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PlanificacionModel


class Planificacion(Resource):
    def get(self,id):
        planificacion=db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion.to_json()
    
    def delete(self,id):
        planificacion=db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion)
        db.session.commit()
        return "", 204
        
    def put(self,id):
        planificacion=db.session.query(PlanificacionModel).get_or_404(id)
        data=request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json(), 201

class Planificaciones(Resource):
    def get(self):
        planificaciones=db.session.query(PlanificacionModel).all()
        return jsonify([planificacion.to_json() for planificacion in planificaciones])
            
    def post(self):
        planificaciones=PlanificacionModel.from_json(request.get_json())
        db.session.add(planificaciones)
        db.session.commit()
        return planificaciones.to_json(), 201

class PlanificacionAlumno(Resource):
    def get(self,dni):
        planificacion_a=db.session.query(PlanificacionModel).get_or_404(dni)
        return planificacion_a.to_json_complete()
    
class PlanificacionProfesor(Resource):
    def get(self,dni):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(dni)
        return planificacion_p.to_json()
    
    def put(self,dni):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(planificacion_p, key, value)
        db.session.add(planificacion_p)
        db.session.commit()
        return planificacion_p.to_json(), 201
    
    def delete(self,dni):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(dni)
        db.session.delete(planificacion_p)
        db.session.commit()
        return "", 204
    
class PlanificacionesProfesores(Resource):
    def get(self):
        dni_profesor = request.args.get("dni_profesor")
        planificaciones = db.session.query(PlanificacionModel)
        if dni_profesor:
            planificaciones = planificaciones.filter(PlanificacionModel.dni_profesor == dni_profesor)
        planificaciones = planificaciones.all()
        return jsonify({"planificaciones": [planificacion.to_json() for planificacion in planificaciones]})