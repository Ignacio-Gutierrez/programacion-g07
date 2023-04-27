from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProfesorModel


class ProfesorClases(Resource):
     def get(self,id):
        profesor=db.session.query(ProfesorModel).get_or_404(id)
        return profesor.to_json()