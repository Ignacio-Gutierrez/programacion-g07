from .. import db
import json

class Usuario(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)

    profesor = db.relationship("Profesor",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    alumno = db.relationship("Alumno",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    
    def __repr__(self):
        return '<Usuario: %r %r %r %r %r>'% (self.dni, self.nombre, self.apellido, self.email, self.telefono)
    
    def to_json(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'contrasena': str(self.contrasena),
            'telefono': str(self.telefono),

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'contrasena': str(self.contrasena),
            'telefono': str(self.telefono),

        }
        return usuario_json

    @staticmethod
    
    def from_json(usuario_json):
        dni = usuario_json.get('dni')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        telefono = usuario_json.get('telefono')
        return Usuario(dni=dni,
                    nombre=nombre,
                    apellido=apellido,     
                    email=email,
                    contrasena=contrasena,
                    telefono=telefono,

                    )