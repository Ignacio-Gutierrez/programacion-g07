from .. import db

class Clase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    dia = db.Column(db.date, nullable=False)
    horario = db.Column(db.String(250), nullable=False)
    def __repr__(self):
        return '<Clase: %r %r %r>' (self.nombre, self.dia, self.horario)
    
    def to_json(self):
        clase_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'dia': str(self.dia),
            'horario': str(self.horario)

        }
        return clase_json

    def to_json_short(self):
        clase_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'dia': str(self.dia),
            'horario': str(self.horario)

        }
        return clase_json

    @staticmethod
    
    def from_json(clase_json):
        id = clase_json.get('id')
        nombre = clase_json.get('nombre')
        dia = clase_json.get('dia')
        horario = clase_json.get('horario')
        
        return Clase(id=id,
                    nombre=nombre,
                    dia=dia,
                    horario=horario,

                    )