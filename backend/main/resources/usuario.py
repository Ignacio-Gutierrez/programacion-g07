from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel, AlumnoModel, ProfesorModel, PlanificacionModel, ClaseModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required


class Usuario(Resource):

    @jwt_required(optional=True)
    def get(self,dni):
        usuario=db.session.query(UsuarioModel).get_or_404(dni)
        current_identity = get_jwt_identity()       
        if current_identity:
            return usuario.to_json_complete()
        else:
            return usuario.to_json()

    @role_required(roles=["admin", "users"])
    def delete(self,dni):
        usuario=db.session.query(UsuarioModel).get_or_404(dni)
        db.session.delete(usuario)
        db.session.commit()
        return "", 204
    
    @jwt_required()
    def put(self,dni):
        usuario=db.session.query(UsuarioModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
class Usuarios(Resource):

    @jwt_required()
    def get(self):
        page = 1
        per_page = 10
        usuarios=db.session.query(UsuarioModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###

        #Busqueda por nombre
        if request.args.get('nombre'):
            usuarios=usuarios.filter(UsuarioModel.nombre.like("%"+request.args.get('nombre')+"%"))
        
        #Ordeno por nombre
        if request.args.get('sortby_nombre'):
            usuarios=usuarios.order_by(desc(UsuarioModel.nombre))
            
        #Busqueda por apellido
        if request.args.get('apellido'):
            usuarios=usuarios.filter(UsuarioModel.apellido.like("%"+request.args.get('apellido')+"%"))
        
        #Ordeno por apellido
        if request.args.get('sortby_apellido'):
            usuarios=usuarios.order_by(desc(UsuarioModel.apellido))
        
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                })
            
    def post(self):
        usuarios = UsuarioModel.from_json(request.get_json())
        print(usuarios)
        try:
            db.session.add(usuarios)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return usuarios.to_json(), 201
    

class UsuarioAlumno(Resource):
    @jwt_required()
    def get(self,dni):
        usuario_a=db.session.query(AlumnoModel).get_or_404(dni)
        return usuario_a.to_json_complete()

    @jwt_required()
    def put(self,dni):
        usuario_a=db.session.query(AlumnoModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(usuario_a, key, value)
        db.session.add(usuario_a)
        db.session.commit()
        return usuario_a.to_json_complete(), 201
    
    @role_required(roles=["admin", "users"])
    def delete(self,dni):
        usuario_a=db.session.query(AlumnoModel).get_or_404(dni)
        db.session.delete(usuario_a)
        db.session.commit()
        return "", 204
    
class UsuariosAlumnos(Resource):
    @role_required(roles=["admin", "profesor"])
    def get(self):
        page = 1
        per_page = 10
        
        usuarios_a = db.session.query(AlumnoModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        if request.args.get('nrPlanificaciones'):
            usuarios_a=usuarios_a.outerjoin(AlumnoModel.planificaciones).group_by(AlumnoModel.id).having(func.count(PlanificacionModel.id) >= int(request.args.get('nrPlanificaciones')))
        
        #Busqueda por name
        if request.args.get('nombre'):
            usuarios_a=usuarios_a.filter(AlumnoModel.nombre.like("%"+request.args.get('nombre')+"%"))
        #Ordeno por name
        if request.args.get('sortby_nombre'):
            usuarios_a=usuarios_a.order_by(desc(AlumnoModel.nombre))

        #Busqueda por apellido
        if request.args.get('apellido'):
            usuarios_a=usuarios_a.filter(AlumnoModel.apellido.like("%"+request.args.get('apellido')+"%"))
        #Ordeno por apellido
        if request.args.get('sortby_apellido'):
            usuarios_a=usuarios_a.order_by(desc(AlumnoModel.apellido))
            
        #Ordeno por id de Planificacion
        if request.args.get('sortby_nrPlanificaciones'):
            usuarios_a=usuarios_a.outerjoin(AlumnoModel.Planificaciones).group_by(AlumnoModel.id).order_by(func.count(PlanificacionModel.id).desc())
        
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        usuarios_a = usuarios_a.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'usuarios': [usuario_a.to_json() for usuario_a in usuarios_a],
                  'total': usuarios_a.total,
                  'pages': usuarios_a.pages,
                  'page': page
                })

    def post(self):
        usuarios_a = AlumnoModel.from_json(request.get_json())
        print(usuarios_a)
        try:
            db.session.add(usuarios_a)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return usuarios_a.to_json(), 201

class UsuariosProfesores(Resource):

    @jwt_required(optional=True)
    def get(self):
        page = 1
        per_page = 10
        
        usuarios_p = db.session.query(ProfesorModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        if request.args.get('nrPlanificaciones'):
            usuarios_p=usuarios_p.outerjoin(ProfesorModel.planificaciones).group_by(ProfesorModel.id).having(func.count(PlanificacionModel.id) >= int(request.args.get('nrPlanificaciones')))
        
        #Busqueda por name
        if request.args.get('nombre'):
            usuarios_p=usuarios_p.filter(ProfesorModel.nombre.like("%"+request.args.get('nombre')+"%"))
        #Ordeno por name
        if request.args.get('sortby_nombre'):
            usuarios_p=usuarios_p.order_by(desc(ProfesorModel.nombre))

        #Busqueda por apellido
        if request.args.get('apellido'):
            usuarios_p=usuarios_p.filter(ProfesorModel.apellido.like("%"+request.args.get('apellido')+"%"))
        #Ordeno por apellido
        if request.args.get('sortby_apellido'):
            usuarios_p=usuarios_p.order_by(desc(ProfesorModel.apellido))
            
        #Ordeno por id de Planificacion
        if request.args.get('sortby_nrPlanificaciones'):
            usuarios_p=usuarios_p.outerjoin(ProfesorModel.Planificaciones).group_by(ProfesorModel.id).order_by(func.count(PlanificacionModel.id).desc())
        
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        usuarios_p = usuarios_p.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'usuarios': [usuario_p.to_json() for usuario_p in usuarios_p],
                  'total': usuarios_p.total,
                  'pages': usuarios_p.pages,
                  'page': page
                })

    def post(self):
        clases_id = request.get_json().get('clases')
        usuarios_p = ProfesorModel.from_json(request.get_json())

        if clases_id:
            clases = ClaseModel.query.filter(ClaseModel.id.in_(clases_id)).all()
            usuarios_p.clases.extend(clases)
            
        db.session.add(usuarios_p)
        db.session.commit()
        return usuarios_p.to_json(), 201
    
class UsuarioProfesor(Resource):

    @jwt_required(optional=True)
    def get(self,dni):
        usuario_p=db.session.query(ProfesorModel).get_or_404(dni)
        return usuario_p.to_json()
    
    @jwt_required()
    def put(self,dni):
        usuario_p=db.session.query(ProfesorModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(usuario_p, key, value)
        db.session.add(usuario_p)
        db.session.commit()
        return usuario_p.to_json(), 201
