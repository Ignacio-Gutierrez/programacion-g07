from flask_restful import Resource
from flask import request

USUARIOS ={
    1: {"nombre":"Elsa","apellido":"Nahoria"},
    2: {"nombre":"Juan","apellido":"Perez"}
    }

USUARIOS_PROFESOR ={
    1: {"nombre":"Elmo","apellido":"Stro"}
}

USUARIOS_ALUMNO ={
    1:{"nombre":"Elsa","apellido":"Nahoria"}
}
class Usuario(Resource):
    def get(self,id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return "", 404
    
    def delete(self,id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return "", 204
        return "", 404
    
    def put(self,id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            data = request.get_json()
            usuario.update(data)
            return "", 201
        return "", 404
    
class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201

class UsuariosAlumnos(Resource):
    def get(self):
        return USUARIOS_ALUMNO

    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS_ALUMNO.keys()))+1
        USUARIOS_ALUMNO[id] = usuario
        return USUARIOS_ALUMNO[id], 201

class UsuarioAlumno(Resource):
    def get(self,id):
        if int(id) in USUARIOS_ALUMNO:
            return USUARIOS_ALUMNO[int(id)]
        return "", 404

    def put(self,id):
        if int(id) in USUARIOS_ALUMNO:
            usuario = USUARIOS_ALUMNO[int(id)]
            data = request.get_json()
            usuario.update(data)
            return "", 201
        return "", 404
    
    def delete(self,id):
        if int(id) in USUARIOS_ALUMNO:
            del USUARIOS_ALUMNO[int(id)]
            return "", 204
        return "", 404
    
class UsuarioProfesor(Resource):
    def get(self,id):
        if int(id) in USUARIOS_PROFESOR:
            return USUARIOS_PROFESOR[int(id)]
        return "", 404
    
    def put(self,id):
        if int(id) in USUARIOS_PROFESOR:
            usuario = USUARIOS_PROFESOR[int(id)]
            data = request.get_json()
            usuario.update(data)
            return "", 201
        return "", 404
