from flask_restful import Resource
from flask import request

PROFESORES = {
    1: {"profesor":"Hugo Ibarra","clase":"Zumba"}
}

class ProfesorClases(Resource):
     def get(self):
        return PROFESORES