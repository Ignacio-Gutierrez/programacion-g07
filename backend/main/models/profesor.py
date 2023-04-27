from .. import db
from .clase import procla

class Profesor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), primary_key=True)
    usuario = db.relationship("Usuario", uselist=False, back_populates="profesor",cascade="all, delete-orphan",single_parent=True)
    planificaciones = db.relationship("Planificacion", back_populates="profesor",cascade="all, delete-orphan")
    procla = db.relationship("Clase", secondary=procla ,lazy="subquery",
        backref=db.backref("profesores",lazy=True))

    def __repr__(self):
        return '<Profesor: %r >'% (self.especialidad)
    
    def to_json(self):
        profesor_json = {
            'id': self.id,
            'especialidad': str(self.especialidad)
        }
        return profesor_json

    def to_json_complete(self):
        planificaciones = [planificacion.to_json() for planificacion in self.planificaciones]
        profesor_json = {
            'id': self.id,
            'especialidad': str(self.especialidad),
            'planificaciones':planificaciones
        }
        return profesor_json    

    def to_json_short(self):
        profesor_json = {
            'id': self.id,
            'especialidad': str(self.especialidad)
        }
        return profesor_json

    @staticmethod
    
    def from_json(profesor_json):
        id = profesor_json.get('id')
        especialidad = profesor_json.get('especialidad')
        return Profesor(id=id,
                    especialidad=especialidad,
                    )