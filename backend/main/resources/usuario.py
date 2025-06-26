from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel, AlumnoModel, ProfesorModel, PlanificacionModel, ClaseModel
from sqlalchemy import func, desc, or_, and_
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required


def validate_json_data(data, required_fields):
    """Valida que los datos JSON contengan los campos requeridos"""
    if not data:
        raise ValueError("No se recibieron datos JSON")
    
    missing_fields = []
    for field in required_fields:
        if field not in data or data[field] is None or (isinstance(data[field], str) and not data[field].strip()):
            missing_fields.append(field)
    
    if missing_fields:
        raise ValueError(f"Los siguientes campos son requeridos: {', '.join(missing_fields)}")
    
    return True


class Usuario(Resource):

    @jwt_required()
    def get(self,dni):
        usuario=db.session.query(UsuarioModel).get_or_404(dni)
        current_identity = get_jwt_identity()       
        if current_identity:
            return usuario.to_json_complete()
        else:
            return usuario.to_json()

    @role_required(roles=["admin"])
    def delete(self,dni):
        usuario=db.session.query(UsuarioModel).get_or_404(dni)
        db.session.delete(usuario)
        db.session.commit()
        return "", 204
    
    def put(self, dni):
        usuario = db.session.query(UsuarioModel).get_or_404(dni)
        data = request.get_json()

        try:
            for key, value in data.items():
                # Si la clave que se está actualizando es la contraseña, cifra la nueva contraseña
                if key == 'password':
                    usuario.plain_password = value  # Utiliza el setter para cifrar la contraseña
                else:
                    setattr(usuario, key, value)

            db.session.add(usuario)
            db.session.commit()
            return usuario.to_json(), 200
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Error interno del servidor'}, 500

    
class Usuarios(Resource):
    @jwt_required()
    def get(self):
        role = request.args.get('rol')
        page = 1
        per_page = 10
        usuarios=db.session.query(UsuarioModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###
        
        # Busqueda por nombre (Input busqueda)

        if request.args.get('search_term'):
            search_term = request.args.get('search_term')
            search_terms = search_term.split(' ')
            
            if len(search_terms) == 1:
                # Si solo hay un término en la búsqueda, busca en el nombre o en el apellido.
                usuarios = usuarios.filter(or_(
                    UsuarioModel.nombre.like(f"%{search_term}%"), 
                    UsuarioModel.apellido.like(f"%{search_term}%")
                ))
            else:
                # Si hay dos términos, busca en el nombre y en el apellido.
                usuarios = usuarios.filter(and_(
                    UsuarioModel.nombre.like(f"%{search_terms[0]}%"),
                    UsuarioModel.apellido.like(f"%{search_terms[1]}%")
                ))



        
        # Busqueda por rol 'user'
        if request.args.get('user'):
            usuarios = usuarios.filter(UsuarioModel.rol == 'user')

        # Busqueda por rol 'profesor'
        if request.args.get('profesor'):
            usuarios = usuarios.filter(UsuarioModel.rol == 'profesor')

        if role:
            usuarios = usuarios.filter(UsuarioModel.rol == role)


        ### FIN FILTROS ####
    
        # Ordenar por nombre alfabéticamente
        usuarios = usuarios.order_by(UsuarioModel.nombre)

        #Obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                })

    @role_required(roles=["admin"])       
    def post(self):
        try:
            usuarios = UsuarioModel.from_json(request.get_json())
            print(usuarios)
            db.session.add(usuarios)
            db.session.commit()
            return usuarios.to_json(), 201
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Formato no correcto o error interno'}, 400
    

class UsuarioAlumno(Resource):
    @jwt_required()
    def get(self,dni):
        usuario_a=db.session.query(AlumnoModel).get_or_404(dni)
        return usuario_a.to_json_complete()

    @role_required(roles=["admin"])
    def put(self,dni):
        usuario_a=db.session.query(AlumnoModel).get_or_404(dni)
        data=request.get_json().items()
        try:
            for key, value in data:
                setattr(usuario_a, key, value)
            db.session.add(usuario_a)
            db.session.commit()
            return usuario_a.to_json_complete(), 201
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Error interno del servidor'}, 500
    
    @role_required(roles=["admin"])
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

    @role_required(roles=["admin"])
    def post(self):
        try:
            usuarios_a = AlumnoModel.from_json(request.get_json())
            print(usuarios_a)
            db.session.add(usuarios_a)
            db.session.commit()
            return usuarios_a.to_json(), 201
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Formato no correcto o error interno'}, 400

class UsuariosProfesores(Resource):

    @jwt_required(optional=True)
    def get(self):
            usuarios_p = db.session.query(ProfesorModel).all()
            resultados = []

            for usuario_p in usuarios_p:
                nombre = usuario_p.usuario.nombre if usuario_p.usuario else None
                resultado = {
                    'dni': usuario_p.dni,
                    'especialidad': usuario_p.especialidad,
                    'nombre': nombre
                }
                resultados.append(resultado)
            return jsonify(resultados)
    

    @role_required(roles=["admin"])
    def post(self):
        try:
            usuarios_p = ProfesorModel.from_json(request.get_json())
            print(usuarios_p)
            db.session.add(usuarios_p)
            db.session.commit()
            return usuarios_p.to_json(), 201
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Formato no correcto o error interno'}, 400
    
class UsuarioProfesor(Resource):

    @jwt_required(optional=True)
    def get(self,dni):
        usuario_p=db.session.query(ProfesorModel).get_or_404(dni)
        return usuario_p.to_json()
    
    @role_required(roles=["admin"])
    def put(self,dni):
        usuario_p=db.session.query(ProfesorModel).get_or_404(dni)
        data=request.get_json().items()
        try:
            for key, value in data:
                setattr(usuario_p, key, value)
            db.session.add(usuario_p)
            db.session.commit()
            return usuario_p.to_json(), 200
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Error interno del servidor'}, 500
