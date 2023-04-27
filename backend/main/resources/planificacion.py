from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PlanificacionModel


class PlanificacionAlumno(Resource):
    def get(self,id):
        planificacion_a=db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion_a.to_json()
    
class PlanificacionesProfesores(Resource):
    def get(self,id):
        id_profesor = request.args.get("id_profesor")
        planificaciones = db.session.query(PlanificacionModel)
        if id_profesor:
            planificaciones = planificaciones.filter(PlanificacionModel.id_profesor == id_profesor)
        planificaciones = planificaciones.all()
        return jsonify({"planificaciones": [planificacion.to_json() for planificacion in planificaciones]})

    def post(self):
        planificacion = PlanificacionModel.from_json(request.get_json())
        print(planificacion)
        try:
            db.session.add(planificacion)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return planificacion.to_json(), 201
    
class PlanificacionProfesor(Resource):
    def get(self,id):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion_p.to_json()
    
    def put(self,id):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(id)
        data=request.get_json().items
        for key, value in data:
            setattr(planificacion_p, key, value)
        db.session.add(planificacion_p)
        db.session.commit()
        return planificacion_p.to_json(), 201
    
    def delete(self,id):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion_p)
        db.session.commit()
        return "", 204
    
