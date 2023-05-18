from .. import db
import json
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(250), unique=True, index=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    rol = db.Column(db.String(10), nullable=False, server_default="users")

    profesor = db.relationship("Profesor",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    alumno = db.relationship("Alumno",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    
    @property
    def plain_password(self):
        raise AttributeError('password cant be read')
    
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
    def validate_pass(self, password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return '<Usuario: %r %r %r %r %r>'% (self.dni, self.nombre, self.apellido, self.email, self.telefono)
    
    def to_json(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'telefono': str(self.telefono),

        }
        return usuario_json
    
    def to_json_complete(self):
        alumno = [alumn.to_json() for alumn in self.alumno]
        profesor=[profe.to_json() for profe in self.profesor]
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'telefono': str(self.telefono),
            'alumno': alumno,
            'profesor': profesor

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'telefono': str(self.telefono),

        }
        return usuario_json

    @staticmethod
    
    def from_json(usuario_json):
        dni = usuario_json.get('dni')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        email = usuario_json.get('email')
        password = usuario_json.get('password')
        telefono = usuario_json.get('telefono')
        rol = usuario_json.get('rol')
        return Usuario(dni=dni,
                    nombre=nombre,
                    apellido=apellido,     
                    email=email,
                    telefono=telefono,
                    plain_password=password,
                    rol=rol
                    )