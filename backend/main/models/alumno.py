from .. import db
from . import UsuarioModel

class Alumno(db.Model):
    dni = db.Column(db.Integer, db.ForeignKey(UsuarioModel.dni), primary_key=True)
    edad = db.Column(db.Integer, nullable=False)
    peso = db.Column(db.Integer, nullable=False)
    altura = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String(100), nullable=False)
    
    usuario = db.relationship("Usuario", uselist=False, back_populates="alumno",cascade="all, delete-orphan", single_parent=True)

    planificaciones = db.relationship("Planificacion", back_populates="alumno",cascade="all, delete-orphan")

    def __repr__(self):
        return '<Usuario: %r %r %r %r>'% (self.edad, self.peso, self.altura, self.sexo)
    
    def to_json(self):
        alumno_json = {
            'dni': str(self.dni),
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),
            'sexo': str(self.sexo),

        }
        return alumno_json

    def to_json_complete(self):
        planificaciones = [planificacion.to_json() for planificacion in self.planificaciones]
        alumno_json = {
            'dni': str(self.dni),
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),
            'sexo': str(self.sexo),
            'planificaciones':planificaciones,

        }
        return alumno_json

    def to_json_short(self):
        alumno_json = {
            'dni': str(self.dni),
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),
            'sexo': str(self.sexo),

        }
        return alumno_json

    @staticmethod
    
    def from_json(alumno_json):
        dni = alumno_json.get('dni')
        edad = alumno_json.get('edad')
        peso = alumno_json.get('peso')
        altura = alumno_json.get('altura')
        sexo = alumno_json.get('sexo')
        return Alumno(dni=dni,
                    edad=edad,
                    peso=peso,
                    altura=altura,
                    sexo=sexo,

                    )