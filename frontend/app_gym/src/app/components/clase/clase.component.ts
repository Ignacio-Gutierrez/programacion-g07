import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  claseForm!: FormGroup
  newclaseForm!: FormGroup
  selectedRole = localStorage.getItem('role');

  UserData: any = {
    "nombre": null,
    "apellido": null,
    "dni": null,
    "rol": null
  };

  ProfClases: any;
  ProfData: boolean = false;

  private perfilDni: any;
  private parametrosOcultos: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private claseService: ClasesService,
    private formBuilder: FormBuilder,
  ) {
    this.claseForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s0-9]+$/)]],
      dia: ['', [Validators.required]],
      horario: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](-([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/)]],
      id: []
    });
    this.newclaseForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s0-9]+$/)]],
      dia: ['', [Validators.required]],
      horario: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](-([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/)]],
      profesores: [[]]
    });

  }

  ngOnInit(): void {

    const userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });

    this.usuariosService.getUser(this.perfilDni).subscribe(
      (userData) => {
        this.UserData = userData;
        console.log('UserData: ', this.UserData);
        if (this.UserData.rol === 'admin' || this.UserData.rol === 'profesor') {
          this.claseService.getClaseProfesor(this.perfilDni).subscribe(
            (profClase) => {
              this.ProfClases = profClase;
            }
          );
        } else {
          console.log("No tienes permisos para ejecutar esta función");
        }}
    )
  }

  crearClase(dataClase: any = {}) {
    this.newclaseForm.value.profesores = [this.perfilDni];

    this.claseService.createClase(dataClase).subscribe(
      (response) => {
        console.log('Clase creada con éxito', response);
      },
    );
  }

  initFormForUseClase(clase: any) {
    this.claseForm.setValue({
      nombre: clase.nombre,
      dia: clase.dia,
      horario: clase.horario,
      id: clase.id
    });
  }


  editarClase(idClase: number, dataClase: any = {}) {
    this.claseService.updateClase(idClase, dataClase).subscribe(
      (response) => {
        console.log('Clase actualizada con éxito', response);
      }
    );
  }

  borrarClase() {
    this.claseService.deleteClase(this.claseForm.value.id).subscribe(
      (error) => {
        console.error(`Error al eliminar clase: ${error}`);
      }
    );
    window.location.reload();
  }



  submitClase() {
    if (this.newclaseForm.valid) {
      if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
        this.usuariosService.getUserProf(this.perfilDni).subscribe(
          (profData) => {
            console.log("Profesor verificado. Creando clase...");
            this.crearClase(this.newclaseForm.value);
          },
          (error) => {
            console.error("El usuario no es un profesor registrado y no puede crear clases.", error);
            alert("Error: Debes tener un perfil de profesor completo para poder crear una clase.");
          }
        );
      } else {
        alert("Solo los profesores o administradores pueden crear clases.");
      }
    } else {
      let errorMessage = 'Formulario inválido. Por favor, revisa los siguientes campos:\n';
      if (this.newclaseForm.get('nombre')?.invalid) errorMessage += '- Nombre (debe tener entre 3 y 50 caracteres).\n';
      if (this.newclaseForm.get('dia')?.invalid) errorMessage += '- Día (debe ser un día de la semana válido, ej: Lunes).\n';
      if (this.newclaseForm.get('horario')?.invalid) errorMessage += '- Horario (debe tener formato HH:MM o HH:MM-HH:MM).\n';
      alert(errorMessage);
    }
  }

  editClase() {
    if (this.claseForm.valid) {
      if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
        this.editarClase(this.claseForm.value.id, this.claseForm.value);
        window.location.reload();
      }
    } else {
      alert('Formulario inválido');
    }
  }
}