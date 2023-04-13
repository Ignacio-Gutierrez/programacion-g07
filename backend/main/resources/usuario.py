from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel


class Usuario(Resource):
    def get(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()

    def delete(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return "", 204
        
    def put(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        data=request.get_json().items
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
class Usuarios(Resource):
    def get(self):
        usuarios=db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])
            
    def post(self):
        usuario=UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
class UsuariosAlumnos(Resource):
    def get(self):
        usuarios_a = db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios_a])

    def post(self):
        usuarios_a = UsuarioModel.from_json(request.get_json())
        db.session.add(usuarios_a)
        db.session.commit()
        return usuarios_a.to_json(), 201

class UsuarioAlumno(Resource):
    def get(self,id):
        usuario_a=db.session.query(UsuarioModel).get_or_404(id)
        return usuario_a.to_json()

    def put(self,id):
        usuario_a=db.session.query(UsuarioModel).get_or_404(id)
        data=request.get_json().items
        for key, value in data:
            setattr(usuario_a, key, value)
        db.session.add(usuario_a)
        db.session.commit()
        return usuario_a.to_json(), 201
    
    def delete(self,id):
        usuario_a=db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario_a)
        db.session.commit()
        return "", 204
    
class UsuarioProfesor(Resource):
    def get(self,id):
        usuario_p=db.session.query(UsuarioModel).get_or_404(id)
        return usuario_p.to_json()
    
    def put(self,id):
        usuario_p=db.session.query(UsuarioModel).get_or_404(id)
        data=request.get_json().items
        for key, value in data:
            setattr(usuario_p, key, value)
        db.session.add(usuario_p)
        db.session.commit()
        return usuario_p.to_json(), 201
