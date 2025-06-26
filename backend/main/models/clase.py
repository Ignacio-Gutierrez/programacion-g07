from .. import db
from .profesor import procla
import re
from sqlalchemy.orm import validates

class Clase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    dia = db.Column(db.String(100), nullable=False)
    horario = db.Column(db.String(250), nullable=False)

    @validates('nombre')
    def validate_nombre(self, key, nombre):
        if not nombre or not nombre.strip():
            raise ValueError("Nombre de clase es requerido")
        if len(nombre.strip()) < 3:
            raise ValueError("Nombre de clase debe tener al menos 3 caracteres")
        if len(nombre.strip()) > 50:
            raise ValueError("Nombre de clase no puede exceder 50 caracteres")
        if not re.match(r'^[a-zA-ZÀ-ÿ\s0-9]+$', nombre.strip()):
            raise ValueError("Nombre de clase solo puede contener letras, números y espacios")
        return nombre.strip().title()
    
    @validates('dia')
    def validate_dia(self, key, dia):
        if not dia or not dia.strip():
            raise ValueError("Día es requerido")
        valid_dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
        dia_lower = dia.strip().lower()
        if dia_lower not in valid_dias:
            raise ValueError(f"Día debe ser uno de: {', '.join(valid_dias)}")
        return dia.strip().title()
    
    @validates('horario')
    def validate_horario(self, key, horario):
        if not horario or not horario.strip():
            raise ValueError("Horario es requerido")
        # Patrón para validar formatos como "08:00", "14:30-15:30"
        pattern = r'^([0-1]?[0-9]|2[0-3]):[0-5][0-9](-([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$'
        if not re.match(pattern, horario.strip()):
            raise ValueError("Horario debe tener formato HH:MM o HH:MM-HH:MM (24h)")
        return horario.strip()

    def __repr__(self):
        return '<Clase: %r %r %r>'% (self.nombre, self.dia, self.horario)
    
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