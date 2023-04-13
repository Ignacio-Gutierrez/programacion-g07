from .. import db

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

    def __repr__(self):
        return '<Planificacion: %r %r %r %r %r %r %r %r>' (self.descripcion, self.fecha, self.lunes, self.martes, self.miercoles, self.jueves, self.viernes, self.sabado)
    
    def to_json(self):
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
        return Planificacion(id=id,
                    descripcion=descripcion,
                    fecha=fecha,
                    lunes=lunes,
                    martes=martes,
                    miercoles=miercoles,
                    jueves=jueves,
                    viernes=viernes,
                    sabado=sabado,

                    )