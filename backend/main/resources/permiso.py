from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PermisoModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

    
class Permisos(Resource):
    
    @role_required(roles=["admin"])
    def post(self):
        try:
            permisos=PermisoModel.from_json(request.get_json())
            print(permisos)
            db.session.add(permisos)
            db.session.commit()
            return permisos.to_json(), 201
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Formato no correcto o error interno'}, 400
    
class Permiso(Resource):
    def put(self,id):
        permiso=db.session.query(PermisoModel).get_or_404(id)
        data=request.get_json().items()
        try:
            for key, value in data:
                setattr(permiso, key, value)
            db.session.add(permiso)
            db.session.commit()
            return permiso.to_json(), 200
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Error interno del servidor'}, 500