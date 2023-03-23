import os
from flask import Flask
from dotenv import load_dotenv

#metodo que inicializa la app y todos los modulos

def create_app():

    #inicio de flask
    app = Flask(__name__)

    #variables de entorno
    load_dotenv()


    #retornamos la app inicializada
    return app