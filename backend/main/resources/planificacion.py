from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PlanificacionModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required
from datetime import datetime

class Planificacion(Resource):
    @jwt_required()
    def get(self,id):
        planificacion=db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion.to_json()
    
    @role_required(roles=["admin"])
    def delete(self,id):
        planificacion=db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion)
        db.session.commit()
        return "", 204
    
    @role_required(roles=["admin", "profesor"])
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json()
        
        try:
            if 'fecha' in data:
                fecha_str = data['fecha']
                try:
                    fecha = datetime.strptime(fecha_str, '%Y-%m-%d')
                    data['fecha'] = fecha
                except ValueError:
                    return {"error": "Formato de fecha incorrecto. Use 'yyyy-MM-dd'."}, 400

            for key, value in data.items():
                setattr(planificacion, key, value)

            db.session.add(planificacion)
            db.session.commit()
            
            # **ENVIAR EMAIL DE PLANIFICACIÓN ACTUALIZADA**
            try:
                from main.models import AlumnoModel, ProfesorModel, UsuarioModel
                
                alumno = db.session.query(AlumnoModel).get(planificacion.alumno_dni)
                profesor = db.session.query(ProfesorModel).get(planificacion.profesor_dni)
                
                if alumno and profesor:
                    usuario_alumno = db.session.query(UsuarioModel).get(alumno.dni)
                    usuario_profesor = db.session.query(UsuarioModel).get(profesor.dni)
                    
                    if usuario_alumno and usuario_alumno.email:
                        from main.mail.functions import sendMail
                        
                        email_data = {
                            'alumno': usuario_alumno,
                            'profesor': usuario_profesor,
                            'planificacion': {
                                'descripcion': planificacion.descripcion,
                                'fecha': planificacion.fecha.strftime("%d/%m/%Y")
                            }
                        }
                        
                        result = sendMail(
                            to=[usuario_alumno.email],
                            subject="📝 Planificación Actualizada - Gym El Chicho",
                            template="planificacion_actualizada",  # Crear este template también
                            **email_data
                        )
                        
                        print(f"✅ Email de actualización enviado a {usuario_alumno.email}")
                        
            except Exception as email_error:
                print(f"❌ Error en envío de email de actualización: {str(email_error)}")
            
            return planificacion.to_json(), 200
            
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Error interno del servidor'}, 500

class Planificaciones(Resource):

    @jwt_required()
    def get(self):
        page = 1
        per_page = 10
        
        planificaciones = db.session.query(PlanificacionModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        
        #Busqueda por Profesor
        if request.args.get('profesor'):
            planificaciones=planificaciones.filter(PlanificacionModel.profesor_dni.like("%"+request.args.get('profesor_dni')+"%"))
        #Ordeno por Profesor
        if request.args.get('sortby_profesor'):
            planificaciones=planificaciones.order_by(desc(PlanificacionModel.profesor_dni))

        #Busqueda por Alumno
        if request.args.get('alumno'):
            planificaciones=planificaciones.filter(PlanificacionModel.alumno_dni.like("%"+request.args.get('alumno_dni')+"%"))
        #Ordeno por Alumno
        if request.args.get('sortby_alumno'):
            planificaciones=planificaciones.order_by(desc(PlanificacionModel.alumno_dni))

        #Busqueda por Fecha
        if request.args.get('fecha'):
            planificaciones=planificaciones.filter(PlanificacionModel.fecha.like("%"+request.args.get('fecha')+"%"))    
        #Ordeno por Fecha
        if request.args.get('sortby_fecha'):
            planificaciones=planificaciones.order_by(desc(PlanificacionModel.fecha))
        
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        planificaciones = planificaciones.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'planificaciones': [planificacion.to_json() for planificacion in planificaciones],
                  'total': planificaciones.total,
                  'pages': planificaciones.pages,
                  'page': page
                })

    @role_required(roles=["admin", "profesor"])
    def post(self):
        try:
            planificaciones = PlanificacionModel.from_json(request.get_json())
            print(planificaciones)
            db.session.add(planificaciones)
            db.session.commit()
            
            # **ENVIAR EMAIL AL ALUMNO**
            try:
                # Obtener datos del alumno y profesor
                from main.models import AlumnoModel, ProfesorModel, UsuarioModel
                
                alumno = db.session.query(AlumnoModel).get(planificaciones.alumno_dni)
                profesor = db.session.query(ProfesorModel).get(planificaciones.profesor_dni)
                
                if alumno and profesor:
                    # Obtener el usuario del alumno (para el email)
                    usuario_alumno = db.session.query(UsuarioModel).get(alumno.dni)
                    usuario_profesor = db.session.query(UsuarioModel).get(profesor.dni)
                    
                    if usuario_alumno and usuario_alumno.email:
                        from main.mail.functions import sendMail
                        
                        # Datos para el template
                        email_data = {
                            'alumno': usuario_alumno,
                            'profesor': usuario_profesor,
                            'planificacion': {
                                'descripcion': planificaciones.descripcion,
                                'fecha': planificaciones.fecha.strftime("%d/%m/%Y")
                            }
                        }
                        
                        # Enviar email
                        result = sendMail(
                            to=[usuario_alumno.email],
                            subject="🏋️ Nueva Planificación Disponible - Gym El Chicho",
                            template="nueva_planificacion",
                            **email_data
                        )
                        
                        if result == True:
                            print(f"✅ Email enviado exitosamente a {usuario_alumno.email}")
                        else:
                            print(f"❌ Error enviando email: {result}")
                    else:
                        print(f"⚠️ No se encontró email para el alumno DNI: {alumno.dni}")
                        
            except Exception as email_error:
                print(f"❌ Error en envío de email: {str(email_error)}")
                # No interrumpir el proceso si falla el email
            
            return planificaciones.to_json(), 201
            
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Formato no correcto o error interno'}, 500

class PlanificacionAlumno(Resource):

    @jwt_required()
    def get(self,dni):
        planificacion_a=(db.session.query(PlanificacionModel).filter(PlanificacionModel.alumno_dni == dni)).all()
        return jsonify([planificacion.to_json()for planificacion in planificacion_a])
    
class PlanificacionProfesor(Resource):

    @jwt_required()
    def get(self,dni):
        planificacion_p=(db.session.query(PlanificacionModel).filter(PlanificacionModel.profesor_dni == dni)).all()
        return jsonify([planificacion.to_json()for planificacion in planificacion_p])
    
    @role_required(roles=["admin"])
    def put(self,dni):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(dni)
        data=request.get_json().items()
        for key, value in data:
            setattr(planificacion_p, key, value)
        db.session.add(planificacion_p)
        db.session.commit()
        return planificacion_p.to_json(), 201
    
    @role_required(roles=["admin"])
    def delete(self,dni):
        planificacion_p=db.session.query(PlanificacionModel).get_or_404(dni)
        db.session.delete(planificacion_p)
        db.session.commit()
        return "", 204
    
class PlanificacionesProfesores(Resource):
    @jwt_required()
    def get(self):
        dni_profesor = request.args.get("dni_profesor")
        planificaciones = db.session.query(PlanificacionModel)
        if dni_profesor:
            planificaciones = planificaciones.filter(PlanificacionModel.profesor_dni == dni_profesor)
        planificaciones = planificaciones.all()
        return jsonify({"planificaciones": [planificacion.to_json() for planificacion in planificaciones]})