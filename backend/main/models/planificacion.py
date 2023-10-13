from .. import db
from . import AlumnoModel, ProfesorModel
from datetime import datetime


class Planificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descripcion = db.Column(db.String(1000), nullable=True)
    fecha = db.Column(db.DateTime, nullable=False)
    lunes = db.Column(db.String(1000), nullable=True)
    martes = db.Column(db.String(1000), nullable=True)
    miercoles = db.Column(db.String(1000), nullable=True)
    jueves = db.Column(db.String(1000), nullable=True)
    viernes = db.Column(db.String(1000), nullable=True)
    sabado = db.Column(db.String(1000), nullable=True)


    alumno_dni = db.Column(db.Integer, db.ForeignKey("alumno.dni"), nullable=False, primary_key=True)
    alumno = db.relationship("Alumno", back_populates="planificaciones", uselist=False, single_parent=True)
    
    profesor_dni = db.Column(db.Integer, db.ForeignKey("profesor.dni"), nullable=False)
    profesor = db.relationship("Profesor", back_populates="planificaciones", uselist=False, single_parent=True)

    def __repr__(self):
        return '<Planificacion: %r %r %r %r %r %r %r %r %r %r>'% (self.descripcion, self.fecha, self.lunes, self.martes, self.miercoles, self.jueves, self.viernes, self.sabado, self.alumno_dni, self.alumno_dni)
    
    def to_json(self):
        self.alumno = db.session.query(AlumnoModel).get_or_404(self.alumno_dni)
        self.profesor = db.session.query(ProfesorModel).get_or_404(self.profesor_dni)
        planificacion_json = {
            'id': self.id,
            'descripcion': str(self.descripcion),
            'fecha': str(self.fecha.strftime("%Y-%m-%d")),
            'lunes': str(self.lunes),
            'martes': str(self.martes),
            'miercoles': str(self.miercoles),
            'jueves': str(self.jueves),
            'viernes': str(self.viernes),
            'sabado': str(self.sabado),
            'alumno': self.alumno.to_json(),
            'profesor': self.profesor.to_json()

        }
        return planificacion_json

    def to_json_short(self):
        planificacion_json = {
            'id': self.id,
            'descripcion': str(self.descripcion),
            'fecha': str(self.fecha.strftime("%Y-%m-%d")),
            'lunes': str(self.lunes),
            'martes': str(self.martes),
            'miercoles': str(self.miercoles),
            'jueves': str(self.jueves),
            'viernes': str(self.viernes),
            'sabado': str(self.sabado),

        }
        return planificacion_json

    @staticmethod
    
    def from_json(planificacion_json):
        id = planificacion_json.get('id')
        descripcion = planificacion_json.get('descripcion')
        fecha = datetime.strptime(planificacion_json.get('fecha'),'%Y-%m-%d')
        lunes = planificacion_json.get('lunes')
        martes = planificacion_json.get('martes')
        miercoles = planificacion_json.get('miercoles')
        jueves = planificacion_json.get('jueves')
        viernes = planificacion_json.get('viernes')
        sabado = planificacion_json.get('sabado')
        alumno_dni = planificacion_json.get('alumno_dni')
        profesor_dni = planificacion_json.get('profesor_dni')
        return Planificacion(id=id,
                    descripcion=descripcion,
                    fecha=fecha,
                    lunes=lunes,
                    martes=martes,
                    miercoles=miercoles,
                    jueves=jueves,
                    viernes=viernes,
                    sabado=sabado,
                    alumno_dni=alumno_dni,
                    profesor_dni=profesor_dni,

                    )