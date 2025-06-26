from .. import db
import json
import re
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
from sqlalchemy import event

class Usuario(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(250), unique=True, index=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    rol = db.Column(db.String(10), nullable=True)

    profesor = db.relationship("Profesor",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    alumno = db.relationship("Alumno",uselist=False,back_populates="usuario",cascade="all, delete-orphan",single_parent=True)
    
    @property
    def plain_password(self):
        raise AttributeError('password cant be read')
    
    @plain_password.setter
    def plain_password(self, password):
        if not password or not password.strip():
            raise ValueError("Contraseña es requerida")
        if len(password) < 6:
            raise ValueError("Contraseña debe tener al menos 6 caracteres")
        if len(password) > 20:
            raise ValueError("Contraseña no puede exceder 20 caracteres")
        self.password = generate_password_hash(password)
    def validate_pass(self, password):
        return check_password_hash(self.password, password)
    
    @validates('dni')
    def validate_dni(self, key, dni):
        if dni is None:
            raise ValueError("DNI es requerido")
        if not isinstance(dni, int) or dni <= 0:
            raise ValueError("DNI debe ser un número entero positivo")
        if not (1000000 <= dni <= 99999999):  # 7-8 dígitos
            raise ValueError("DNI debe tener entre 7 y 8 dígitos")
        return dni
    
    @validates('nombre')
    def validate_nombre(self, key, nombre):
        if not nombre or not nombre.strip():
            raise ValueError("Nombre es requerido")
        if len(nombre.strip()) < 2:
            raise ValueError("Nombre debe tener al menos 2 caracteres")
        if len(nombre.strip()) > 50:
            raise ValueError("Nombre no puede exceder 50 caracteres")
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', nombre.strip()):
            raise ValueError("Nombre solo puede contener letras y espacios")
        return nombre.strip().title()
    
    @validates('apellido')
    def validate_apellido(self, key, apellido):
        if not apellido or not apellido.strip():
            raise ValueError("Apellido es requerido")
        if len(apellido.strip()) < 2:
            raise ValueError("Apellido debe tener al menos 2 caracteres")
        if len(apellido.strip()) > 50:
            raise ValueError("Apellido no puede exceder 50 caracteres")
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', apellido.strip()):
            raise ValueError("Apellido solo puede contener letras y espacios")
        return apellido.strip().title()
    
    @validates('email')
    def validate_email(self, key, email):
        if not email or not email.strip():
            raise ValueError("Email es requerido")
        email = email.strip().lower()
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            raise ValueError("Email debe tener un formato válido")
        if len(email) > 250:
            raise ValueError("Email no puede exceder 250 caracteres")
        return email
    
    @validates('telefono')
    def validate_telefono(self, key, telefono):
        if telefono is None:
            raise ValueError("Teléfono es requerido")
        
        # Manejar string o int
        if isinstance(telefono, str):
            if not telefono.strip().isdigit():
                raise ValueError("Teléfono debe contener solo números")
            telefono = int(telefono.strip())
        
        if not isinstance(telefono, int) or telefono <= 0:
            raise ValueError("Teléfono debe ser un número entero positivo")
        
        telefono_str = str(telefono)
        # CAMBIO: Permitir 7-15 dígitos (antes era 8-15)
        if not (7 <= len(telefono_str) <= 15):
            raise ValueError("Teléfono debe tener entre 7 y 15 dígitos")
        
        return telefono
    
    @validates('rol')
    def validate_rol(self, key, rol):
        if not rol or not rol.strip():
            raise ValueError("Rol es requerido")
        valid_roles = ['admin', 'profesor', 'user']
        if rol.strip().lower() not in valid_roles:
            raise ValueError(f"Rol debe ser uno de: {', '.join(valid_roles)}")
        return rol.strip().lower()
    
    @validates('password')
    def validate_password_hash(self, key, password):
        if not password:
            raise ValueError("Password hash es requerido")
        return password
    
    def __repr__(self):
        return '<Usuario: %r %r %r %r %r %r>'% (self.dni, self.nombre, self.apellido, self.email, self.telefono, self.rol)
    
    def to_json(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'telefono': str(self.telefono),
            'password':str(self.password),
            'rol': str(self.rol)
        }
        return usuario_json
    
    def to_json_complete(self):
        alumno = self.alumno.to_json() if self.alumno else None
        profesor = self.profesor.to_json() if self.profesor else None

        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'email': str(self.email),
            'telefono': str(self.telefono),
            'rol': str(self.rol),
            'password':str(self.password),
            'alumno': alumno,
            'profesor': profesor

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'dni': str(self.dni),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'telefono': str(self.telefono),
            'rol': str(self.rol)
        }
        return usuario_json

    @staticmethod
    
    def from_json(usuario_json):
        dni = usuario_json.get('dni')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        email = usuario_json.get('email')
        password = usuario_json.get('password')
        telefono = usuario_json.get('telefono')
        rol = usuario_json.get('rol')
        return Usuario(dni=dni,
                    nombre=nombre,
                    apellido=apellido,     
                    email=email,
                    telefono=telefono,
                    plain_password=password,
                    rol=rol
                    )