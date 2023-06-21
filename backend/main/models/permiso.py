from .. import db
from main.models import UsuarioModel


class Permiso(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    rol = db.Column(db.String(10), nullable=False)
    recurso = db.Column(db.String(100), nullable=True)
    metodo = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return '<Permiso: %r %r %r >'% (self.rol, self.recurso, self.metodo)
    
    def to_json(self):
        permiso_json = {
            'id': self.id,
            'rol': str(self.rol),
            'recurso': str(self.recurso),
            'metodo': str(self.metodo)
        }
        return permiso_json

    def to_json_complete(self):
        permiso_json = {
            'id': self.id,
            'rol': str(self.rol),
            'recurso': str(self.recurso),
            'metodo': str(self.metodo)
        }
        return permiso_json    

    def to_json_short(self):
        permiso_json = {
            'id': self.id,
            'rol': str(self.rol),
            'recurso': str(self.recurso),
            'metodo': str(self.metodo)
        }
        return permiso_json

    @staticmethod
    
    def from_json(permiso_json):
        id = permiso_json.get('id')
        rol = permiso_json.get('rol')
        recurso = permiso_json.get('recurso')
        metodo = permiso_json.get('metodo')
        return Permiso(id=id,
                    rol=rol,
                    recurso=recurso,
                    metodo=metodo

                    )