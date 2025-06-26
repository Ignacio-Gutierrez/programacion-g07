from .. import jwt
from flask import jsonify, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from .. import db
from main.models import PermisoModel

def role_required(roles):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            resource = request.endpoint
            method = fn.__name__.upper()
            rol = claims['rol']

            exists = db.session.query(PermisoModel).filter(PermisoModel.recurso == resource).first()
            if exists:
                rol_not_permitted =db.session.query(PermisoModel).filter(PermisoModel.recurso == resource).filter(PermisoModel.metodo == method).filter(PermisoModel.rol == rol).scalar() is None
                if rol_not_permitted:
                    return 'Rol sin permisos de acceso al recurso', 403
            return fn(*args, **kwargs)
        
        return wrapper
    return decorator

@jwt.user_identity_loader
def user_identity_lookup(usuario):
    return str(usuario.dni)

@jwt.additional_claims_loader
def add_claims_to_access_token(usuario):
    claims = {
        'rol': usuario.rol,
        'dni': usuario.dni,
        'email': usuario.email
    }
    return claims