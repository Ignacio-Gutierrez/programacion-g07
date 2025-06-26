from .. import db
from . import UsuarioModel
import re
from sqlalchemy.orm import validates

class Alumno(db.Model):
    dni = db.Column(db.Integer, db.ForeignKey(UsuarioModel.dni), primary_key=True)
    edad = db.Column(db.Integer, nullable=False)
    peso = db.Column(db.Integer, nullable=False)
    altura = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String(100), nullable=False)
    
    usuario = db.relationship("Usuario", uselist=False, back_populates="alumno",cascade="all, delete-orphan", single_parent=True)

    planificaciones = db.relationship("Planificacion", back_populates="alumno",cascade="all, delete-orphan")

    @validates('edad')
    def validate_edad(self, key, edad):
        if edad is None:
            raise ValueError("Edad es requerida")
        
        try:
            edad = int(edad)
        except (ValueError, TypeError):
            raise ValueError("Edad debe ser un número entero válido")
        
        if edad <= 0:
            raise ValueError("Edad debe ser un número entero positivo")
        if not (13 <= edad <= 100):
            raise ValueError("Edad debe estar entre 13 y 100 años")
        return edad
    
    @validates('peso')
    def validate_peso(self, key, peso):
        if peso is None:
            raise ValueError("Peso es requerido")
        
        try:
            peso = float(peso)
        except (ValueError, TypeError):
            raise ValueError("Peso debe ser un número válido")
        
        if peso <= 0:
            raise ValueError("Peso debe ser un número positivo")
        if not (20 <= peso <= 300):
            raise ValueError("Peso debe estar entre 20 y 300 kg")
        return round(peso, 2)
    
    @validates('altura')
    def validate_altura(self, key, altura):
        if altura is None:
            raise ValueError("Altura es requerida")
        
        try:
            altura = float(altura)
        except (ValueError, TypeError):
            raise ValueError("Altura debe ser un número válido")
        
        if altura <= 0:
            raise ValueError("Altura debe ser un número positivo")
        if not (0.50 <= altura <= 2.50):
            raise ValueError("Altura debe estar entre 0.50 y 2.50 metros")
        return round(float(altura), 2)
    
    @validates('sexo')
    def validate_sexo(self, key, sexo):
        if not sexo or not sexo.strip():
            raise ValueError("Sexo es requerido")
        valid_sexos = ['masculino', 'femenino', 'm', 'f']
        sexo_lower = sexo.strip().lower()
        if sexo_lower not in valid_sexos:
            raise ValueError("Sexo debe ser Masculino o Femenino")
        # Normalizar a formato estándar
        if sexo_lower in ['masculino', 'm']:
            return 'Masculino'
        else:
            return 'Femenino'


    def __repr__(self):
        return '<Usuario: %r %r %r %r>'% (self.edad, self.peso, self.altura, self.sexo)
    
    def to_json(self):
        alumno_json = {
            'dni': str(self.dni),
            'edad': str(self.edad),
            'peso': str(self.peso),
            'altura': str(self.altura),
            'sexo': str(self.sexo)

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
            'planificaciones':planificaciones

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
                    sexo=sexo

                    )