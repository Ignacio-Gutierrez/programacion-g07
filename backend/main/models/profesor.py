from .. import db

class Profesor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Profesor: %r >'% (self.especialidad)
    
    def to_json(self):
        profesor_json = {
            'id': self.id,
            'especialidad': str(self.especialidad)
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