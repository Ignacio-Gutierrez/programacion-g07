from .. import db
from . import UsuarioModel
import re
from sqlalchemy.orm import validates

procla = db.Table("procla",
    db.Column("clase_id",db.Integer,db.ForeignKey("clase.id"),primary_key=True),
    db.Column("profesor_dni",db.Integer,db.ForeignKey("profesor.dni"),primary_key=True)
    )


class Profesor(db.Model):
    dni = db.Column(db.Integer, db.ForeignKey(UsuarioModel.dni), primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)

    clases = db.relationship('Clase', secondary=procla, backref=db.backref('profesores', lazy='dynamic'),cascade="all")
    
    usuario = db.relationship("Usuario", uselist=False, back_populates="profesor",cascade="all, delete-orphan",single_parent=True)
    
    planificaciones = db.relationship("Planificacion", back_populates="profesor",cascade="all, delete-orphan")

    @validates('especialidad')
    def validate_especialidad(self, key, especialidad):
        if not especialidad or not especialidad.strip():
            raise ValueError("Especialidad es requerida")
        if len(especialidad.strip()) < 3:
            raise ValueError("Especialidad debe tener al menos 3 caracteres")
        if len(especialidad.strip()) > 50:
            raise ValueError("Especialidad no puede exceder 50 caracteres")
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', especialidad.strip()):
            raise ValueError("Especialidad solo puede contener letras y espacios")
        return especialidad.strip().title()

    def __repr__(self):
        return '<Profesor: %r >'% (self.especialidad)
    
    def to_json(self):
        profesor_json = {
            'dni': self.dni,
            'especialidad': str(self.especialidad)
        }
        return profesor_json

    def to_json_complete(self):
        planificaciones = [planificacion.to_json() for planificacion in self.planificaciones]
        profesor_json = {
            'dni': self.dni,
            'especialidad': str(self.especialidad),
            'planificaciones':planificaciones
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