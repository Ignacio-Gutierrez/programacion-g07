from .. import db
from .clase import procla
from . import UsuarioModel


class Profesor(db.Model):
    dni = db.Column(db.Integer, db.ForeignKey(UsuarioModel.dni), primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)

    usuario = db.relationship("Usuario", uselist=False, back_populates="profesor",cascade="all, delete-orphan",single_parent=True)
    
    planificaciones = db.relationship("Planificacion", back_populates="profesor",cascade="all, delete-orphan")

    def __repr__(self):
        return '<Profesor: %r >'% (self.especialidad)
    
    def to_json(self):
        profesor_json = {
            'dni': self.dni,
            'especialidad': str(self.especialidad)
        }
        return profesor_json

    def to_json_complete(self):
        #planificaciones = [planificacion.to_json() for planificacion in self.planificaciones]
        profesor_json = {
            'dni': self.dni,
            'especialidad': str(self.especialidad),
            #'planificaciones':planificaciones
        }
        return profesor_json    

    def to_json_short(self):
        profesor_json = {
            'dni': self.dni,
            'especialidad': str(self.especialidad)
        }
        return profesor_json

    @staticmethod
    
    def from_json(profesor_json):
        dni = profesor_json.get('dni')
        especialidad = profesor_json.get('especialidad')
        return Profesor(dni=dni,
                    especialidad=especialidad,
                    )