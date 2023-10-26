import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  profileForm!: FormGroup 
  selectedRole = localStorage.getItem('role');

  UserData: any = {
    "nombre": null,
    "apellido": null,
    "dni": null,
    "rol": null
    };

  AlumData: any = {
    "dni": null,
    "edad": null,
    "peso": null,
    "altura": null,
    "sexo": null,
    };

  newAlumData: any = {
    "dni": null,
    "edad": null,
    "peso": null,
    "altura": null,
    "sexo": null,
    };

  ProfData: any = {
    "dni": null,
    "especialidad": null,
    };

  newProfData: any = {
    "dni": null,
    "especialidad": null,
    };
  private perfilDni: any;
  private parametrosOcultos: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.profileForm = this.formBuilder.group({
      dni: [''],
      edad: [''],
      peso: [''],
      altura: [''],
      sexo: [''],
      especialidad: ['']
    });
  }

  ngOnInit(): void {

    const userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });

    if (userDNI && this.selectedRole === 'user') {
      this.usuariosService.getUser(userDNI).subscribe(
        (userData) => {
          this.UserData = userData;
          console.log('UserData: ', this.UserData);

          if (this.UserData.rol === 'user') {
            this.usuariosService.getUserAlum(userDNI).subscribe(
              (alumData) => {
                this.AlumData = alumData;
                console.log('AlumData: ', this.AlumData);
              },
              (alumError) => {
                console.error('Error fetching AlumData: ', alumError);
              }
            );
          }
        },
        (userError) => {
          console.error('Error fetching UserData: ', userError);
        }
      );
    } else if (this.perfilDni && (this.selectedRole === 'admin' || this.selectedRole === 'profesor')) {
      this.usuariosService.getUser(this.perfilDni).subscribe(
        (userData) => {
          this.UserData = userData;
          console.log('UserData: ', this.UserData);

          if (this.UserData.rol === 'user') {
            this.usuariosService.getUserAlum(this.perfilDni).subscribe(
              (alumData) => {
                this.AlumData = alumData;
                console.log('AlumData: ', this.AlumData);
                this.newAlumData = {
                  "dni": this.AlumData.dni,
                  "edad": this.AlumData.edad,
                  "peso": this.AlumData.peso,
                  "altura": this.AlumData.altura,
                  "sexo": this.AlumData.sexo,
                  };

                this.profileForm = this.formBuilder.group({
                  dni: [this.perfilDni, Validators.required],
                  edad: [this.AlumData.edad, Validators.required],
                  peso: [this.AlumData.peso, Validators.required],
                  altura: [this.AlumData.altura, Validators.required],
                  sexo: [this.AlumData.sexo, Validators.required],
                })
              },
              (alumError) => {
                console.error('Error fetching AlumData: ', alumError);
              }
            );
          } else if (this.UserData.rol === 'profesor') {
            this.usuariosService.getUserProf(this.perfilDni).subscribe(
              (profData) => {
                this.ProfData = profData;
                console.log('ProfData: ', this.ProfData);
                this.newProfData = {
                  "dni": this.ProfData.dni,
                  "especialidad": this.ProfData.especialidad,
                  };

                this.profileForm = this.formBuilder.group({
                  dni: [this.perfilDni, Validators.required],
                  especialidad: [this.ProfData.especialidad, Validators.required],
       
                  })
              },
              (profError) => {
                console.error('Error fetching ProfData: ', profError);
              }
            );
          }
        },
        (userError) => {
          console.error('Error fetching UserData: ', userError);
        }
      );
    } else {
      console.error('No se pudo obtener el DNI del token.');
    }
  }
  
  borrarUsuario() {
    if (this.perfilDni) {
      this.usuariosService.deleteUser(this.perfilDni).subscribe(
        () => {
          console.log(`Usuario Eliminado`);
          this.router.navigate(['/vInicio']);
        },
        (error) => {
          console.error(`Error al eliminar user: ${error}`);
        }
      );
    }
  }
  
  crearAlumno(dataAlum:any = {} ){
    this.usuariosService.createUserAlum(dataAlum).subscribe(
      (response) => {
        console.log('Alumno creado con éxito', response);
      },
    );
  }
  crearProfesor(dataProf:any = {} ){
    this.usuariosService.createUserProf(dataProf).subscribe(
      (response) => {
        console.log('Profesor creado con éxito', response);
      },
    );
  }
  editarAlumno(dataAlum:any = {} ){
    this.usuariosService.updateUserAlum(this.perfilDni, dataAlum).subscribe(
      (response) => {
        console.log('Alumno actualizado con éxito', response);
      }
    );
  }
  editarProfesor(dataProf:any = {} ){
    this.usuariosService.updateUserProf(this.perfilDni, dataProf).subscribe(
      (response) => {
        console.log('Profesor actualizado con éxito', response);
      },
    );
  }


  submit() {
    if (this.profileForm.valid) {
      if (this.UserData.rol === 'user') {
        console.log("Datos alumno:", this.profileForm.value);
  
        this.usuariosService.getUserAlum(this.perfilDni).subscribe(
          (alumData) => {
            this.editarAlumno(this.profileForm.value);
            window.location.reload();
          },
          (alumError) => {
            this.profileForm.value.dni = this.perfilDni
            this.crearAlumno(this.profileForm.value);
            window.location.reload();
          }
        );
      } else if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
        this.usuariosService.getUserProf(this.perfilDni).subscribe(
          (profData) => {
            this.editarProfesor(this.profileForm.value);
            window.location.reload();
          },
          (profError) => {
            this.profileForm.value.dni = this.perfilDni
            this.crearProfesor(this.profileForm.value);
            window.location.reload();
          }
        );
      }
    } else {
      alert('Formulario inválido');
    }
  }
  

  verPlanif(dni: string) {
    const parametrosOcultos = {
      dni: dni
    };
  
    this.router.navigate(['/vPlanif'], { state: parametrosOcultos });;
  }
}