from flask_restful import Resource
from flask import request

PAGO={ 
    1:{"id alumno":"1","pago":"realizado"},
    2:{"id alumno":"2","pago":"pendiente"}
}

class Pago(Resource):
    def get(self,id):
        if int(id) in PAGO:
            return PAGO[int(id)]
        return "", 404
    
    def put(self,id):
        if int(id) in PAGO:
            pago = PAGO[int(id)]
            data = request.get_json()
            pago.update(data)
            return "", 201
        return "", 404