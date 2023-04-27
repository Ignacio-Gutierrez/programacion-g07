from .. import db
import json

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(250), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    id_profesor = db.Column(db.Integer,db.ForeignKey("profesor.id"), nullable=False)
    profesor = db.relationship("Profesor",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    id_alumno = db.Column(db.Integer,db.ForeignKey("alumno.id"), nullable=False)
    alumno = db.relationship("Alumno",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    
    def __repr__(self):
        return '<Usuario: %r %r %r %r>'% (self.nombre, self.apellido, self.email, self.telefono)
    
    def to_json(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': str(self.dni),
            'email': str(self.email),
            'contrasena': str(self.contrasena),
            'telefono': str(self.telefono),

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': str(self.dni),
            'email': str(self.email),
            'contrasena': str(self.contrasena),
            'telefono': str(self.telefono),

        }
        return usuario_json

    @staticmethod
    
    def from_json(usuario_json):
        id = usuario_json.get('id')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        dni = usuario_json.get('dni')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        telefono = usuario_json.get('telefono')
        return Usuario(id=id,
                    nombre=nombre,
                    apellido=apellido,
                    dni=dni,
                    email=email,
                    contrasena=contrasena,
                    telefono=telefono,

                    )