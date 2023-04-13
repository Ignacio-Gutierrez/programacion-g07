from .. import db

class Alumno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    edad = db.Column(db.Integer, nullable=False)
    peso = db.Column(db.Integer, nullable=False)
    altura = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<Usuario: %r %r %r>' (self.edad, self.peso, self.altura)
    
    def to_json(self):
        alumno_json = {
            'id': self.id,
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),

        }
        return alumno_json

    def to_json_short(self):
        alumno_json = {
            'id': self.id,
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),

        }
        return alumno_json

    @staticmethod
    
    def from_json(alumno_json):
        id = alumno_json.get('id')
        edad = alumno_json.get('edad')
        peso = alumno_json.get('peso')
        altura = alumno_json.get('altura')
        return Alumno(id=id,
                    edad=edad,
                    peso=peso,
                    altura=altura,

                    )