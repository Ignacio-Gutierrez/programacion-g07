from .. import db
from . import AlumnoModel
from . import ProfesorModel

class Planificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(1000), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)
    lunes = db.Column(db.String(250), nullable=False)
    martes = db.Column(db.String(250), nullable=False)
    miercoles = db.Column(db.String(250), nullable=False)
    jueves = db.Column(db.String(250), nullable=False)
    viernes = db.Column(db.String(250), nullable=False)
    sabado = db.Column(db.String(250), nullable=False)
    id_alumno = db.Column(db.Integer,db.ForeignKey("alumno.id"), nullable=False)
    alumno = db.relationship("Alumno", back_populates="planificaciones", uselist=False, single_parent=True)
    id_profesor = db.Column(db.Integer,db.ForeignKey("profesor.id"), nullable=False)
    profesor = db.relationship("Profesor", back_populates="planificaciones", uselist=False, single_parent=True)

    def __repr__(self):
        return '<Planificacion: %r %r %r %r %r %r %r %r>'% (self.descripcion, self.fecha, self.lunes, self.martes, self.miercoles, self.jueves, self.viernes, self.sabado, self.id_alumno, self.id_profesor)
    
    def to_json(self):
        self.alumno = db.session.query(AlumnoModel).get_or_404(self.id_alumno)
        self.profesor = db.session.query(ProfesorModel).get_or_404(self.id_profesor)
        planificacion_json = {
            'id': self.id,
            'descripcion': str(self.descripcion),
            'fecha': str(self.fecha),
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
            'fecha': str(self.fecha),
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
        fecha = planificacion_json.get('fecha')
        lunes = planificacion_json.get('lunes')
        martes = planificacion_json.get('martes')
        miercoles = planificacion_json.get('miercoles')
        jueves = planificacion_json.get('jueves')
        viernes = planificacion_json.get('viernes')
        sabado = planificacion_json.get('sabado')
        id_alumno = planificacion_json.get('id_alumno')
        id_profesor = planificacion_json.get('id_profesor')
        return Planificacion(id=id,
                    descripcion=descripcion,
                    fecha=fecha,
                    lunes=lunes,
                    martes=martes,
                    miercoles=miercoles,
                    jueves=jueves,
                    viernes=viernes,
                    sabado=sabado,
                    id_alumno=id_alumno,
                    id_profesor=id_profesor

                    )