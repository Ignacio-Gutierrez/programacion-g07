from flask_restful import Resource
from flask import request
from .. import db
from main.models import PlanificacionModel

PLANIFICACIONES ={
    1:{1:"Press de Banca",2:"Sentadillas",3:"Remos con barra",4:"Press militar",5:"Curl de biceps",6:"Extension de triceps"},
    2:{1:"Peso muerto",2:"Flexiones de pecho",3:"Dominadas",4:"Press de hombros con mancuernas",5:"Curl de martillo", 6:"Patada de tríceps"},
    3: {1:"Sentadillas",2:"Press de banca inclinado",3:"Remo con mancuernas", 4:"Press de hombros con barra", 5:"Curl de bíceps con mancuernas", 6:"Extensión de tríceps con mancuernas"}
}

PLANIFICACION_ALUMNO = {
    1:{"id_alumno":"1","id_plan":"1"}
}

class PlanificacionAlumno(Resource):
    def get(self,id):
        if int(id) in PLANIFICACION_ALUMNO:
            return PLANIFICACION_ALUMNO[int(id)]
        return "", 404
    
class PlanificacionesProfesores(Resource):
    def get(self):
        return PLANIFICACIONES

    def post(self):
        planificacion = request.get_json()
        id = int(max(PLANIFICACIONES.keys()))+1
        PLANIFICACIONES[id] = planificacion
        return PLANIFICACIONES[id], 201
    
class PlanificacionProfesor(Resource):
    def get(self,id):
        if int(id) in PLANIFICACIONES:
            return PLANIFICACIONES[int(id)]
        return "", 404
    
    def put(self,id):
        if int(id) in PLANIFICACIONES:
            planificacion = PLANIFICACIONES[int(id)]
            data = request.get_json()
            planificacion.update(data)
            return "", 201
        return "", 404
    
    def delete(self,id):
        if int(id) in PLANIFICACIONES:
            del PLANIFICACIONES[int(id)]
            return "", 204
        return "", 404
    
