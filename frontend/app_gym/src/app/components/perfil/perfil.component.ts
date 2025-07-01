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
  ) {
    this.profileForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(7), Validators.maxLength(8)]],
      edad: ['', [Validators.required, Validators.min(13), Validators.max(100), Validators.pattern(/^[0-9]+$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d{2,3}(,\d{1,2})?$/)]],
      altura: ['', [Validators.required, Validators.pattern(/^[1-2],[0-9]{1,2}$/)]],
      sexo: ['', [Validators.required, Validators.pattern(/^(Masculino|Femenino|masculino|femenino|M|F|m|f)$/)]],
      especialidad: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]]
    });
  }

  ngOnInit(): void {
    const userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });

    // SIEMPRE inicializa el formulario con TODAS las validaciones
    this.profileForm = this.formBuilder.group({
      dni: [this.perfilDni, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(7), Validators.maxLength(8)]],
      edad: ['', [Validators.required, Validators.min(13), Validators.max(100), Validators.pattern(/^[0-9]+$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d{2,3}(,\d{1,2})?$/)]],
      altura: ['', [Validators.required, Validators.pattern(/^[1-2],[0-9]{1,2}$/)]],
      sexo: ['', [Validators.required, Validators.pattern(/^(Masculino|Femenino)$/)]],
      especialidad: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]]
    });

    if (userDNI && this.selectedRole === 'user') {
      this.usuariosService.getUser(userDNI).subscribe(
        (userData) => {
          this.UserData = userData;
          if (this.UserData.rol === 'user') {
            this.usuariosService.getUserAlum(userDNI).subscribe(
              (alumData) => {
                this.AlumData = alumData;
                // Si hay datos, actualiza los valores del formulario
                if (this.AlumData) {
                  // Convertir punto a coma para edición y visualización
                  let peso = this.AlumData.peso;
                  let altura = this.AlumData.altura;
                  if (peso !== null && peso !== undefined) {
                    peso = peso.toString().replace('.', ',');
                  }
                  if (altura !== null && altura !== undefined) {
                    altura = altura.toString().replace('.', ',');
                  }
                  this.profileForm.patchValue({
                    dni: this.perfilDni,
                    edad: this.AlumData.edad,
                    peso: peso,
                    altura: altura,
                    sexo: this.AlumData.sexo,
                  });
                  // También actualizar los datos para la vista
                  this.AlumData.peso = peso;
                  this.AlumData.altura = altura;
                }
              },
              (alumError) => {
                // Si es nuevo, solo setea el dni
                this.profileForm.patchValue({ dni: this.perfilDni });
              }
            );
          }
        },
        (userError) => {
          // Si es nuevo, solo setea el dni
          this.profileForm.patchValue({ dni: this.perfilDni });
        }
      );
    } else if (this.perfilDni && (this.selectedRole === 'admin' || this.selectedRole === 'profesor')) {
      this.usuariosService.getUser(this.perfilDni).subscribe(
        (userData) => {
          this.UserData = userData;
          if (this.UserData.rol === 'user') {
            this.usuariosService.getUserAlum(this.perfilDni).subscribe(
              (alumData) => {
                this.AlumData = alumData;
                if (this.AlumData) {
                  // Convertir punto a coma para edición y visualización
                  let peso = this.AlumData.peso;
                  let altura = this.AlumData.altura;
                  if (peso !== null && peso !== undefined) {
                    peso = peso.toString().replace('.', ',');
                  }
                  if (altura !== null && altura !== undefined) {
                    altura = altura.toString().replace('.', ',');
                  }
                  this.profileForm.patchValue({
                    dni: this.perfilDni,
                    edad: this.AlumData.edad,
                    peso: peso,
                    altura: altura,
                    sexo: this.AlumData.sexo,
                  });
                  // También actualizar los datos para la vista
                  this.AlumData.peso = peso;
                  this.AlumData.altura = altura;
                }
              },
              (alumError) => {
                this.profileForm.patchValue({ dni: this.perfilDni });
              }
            );
          } else if (this.UserData.rol === 'profesor') {
            this.usuariosService.getUserProf(this.perfilDni).subscribe(
              (profData) => {
                this.ProfData = profData;
                console.log('ProfData: ', this.ProfData);
                
                // ✅ NO RECREAR EL FORMULARIO. SOLO ACTUALIZAR VALORES.
                if (this.ProfData) {
                  this.profileForm.patchValue({
                    dni: this.perfilDni,
                    especialidad: this.ProfData.especialidad
                  });
                }
              },
              (profError) => {
                console.error('Error fetching ProfData: ', profError);
                // Si es un profesor nuevo, solo setear el DNI
                this.profileForm.patchValue({ dni: this.perfilDni });
              }
            );
          }
        },
        (userError) => {
          this.profileForm.patchValue({ dni: this.perfilDni });
        }
      );
    } else {
      this.profileForm.patchValue({ dni: this.perfilDni });
    }
  }

  borrarUsuario() {
    if (this.perfilDni) {
      // Si el usuario autenticado es profesor y el usuario a eliminar es alumno, usar el endpoint específico
      if (this.selectedRole === 'profesor' && this.UserData.rol === 'user') {
        this.usuariosService.deleteUserAlum(this.perfilDni).subscribe(
          () => {
            console.log(`Alumno eliminado correctamente`);
            this.router.navigate(['/vInicio']);
          },
          (error) => {
            console.error(`Error al eliminar alumno: ${error}`);
          }
        );
      } else {
        // Admin o cualquier otro caso permitido
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
  }

  crearAlumno(dataAlum: any = {}) {
    this.usuariosService.createUserAlum(dataAlum).subscribe(
      (response) => {
        console.log('Alumno creado con éxito', response);
      },
    );
  }
  crearProfesor(dataProf: any = {}) {
    this.usuariosService.createUserProf(dataProf).subscribe(
      (response) => {
        console.log('Profesor creado con éxito', response);
      },
    );
  }
  editarAlumno(dataAlum: any = {}) {
    this.usuariosService.updateUserAlum(this.perfilDni, dataAlum).subscribe(
      (response) => {
        console.log('Alumno actualizado con éxito', response);
      }
    );
  }
  editarProfesor(dataProf: any = {}) {
    this.usuariosService.updateUserProf(this.perfilDni, dataProf).subscribe(
      (response) => {
        console.log('Profesor actualizado con éxito', response);
      },
    );
  }

  submit() {
    let isFormValid = false;
    
    if (this.UserData.rol === 'user') {
      isFormValid = this.profileForm.valid;
    } else if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
      isFormValid = this.canSubmitForm();
    }

    if (isFormValid) {
      if (this.UserData.rol === 'user') {
        console.log("Datos alumno:", this.profileForm.value);

        this.usuariosService.getUserAlum(this.perfilDni).subscribe(
          (alumData) => {
            console.log("El alumno ya existe. Actualizando...");
            this.editarAlumno(this.profileForm.value);
            window.location.reload();
          },
          (alumError) => {
            if (alumError.status === 404) {
              console.log("El alumno no existe. Creando nuevo registro...");
              this.profileForm.value.dni = this.perfilDni
              this.crearAlumno(this.profileForm.value);
              window.location.reload();
            } else {
              console.error('Error al verificar alumno:', alumError);
              alert("Complete el formulario del alumno");
            }
          }
        );
      } else if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
        this.usuariosService.getUserProf(this.perfilDni).subscribe(
          (profData) => {
            this.editarProfesor(this.profileForm.value);
            window.location.reload();
          },
          (profError) => {
            this.profileForm.value.dni = this.perfilDni;
            this.crearProfesor(this.profileForm.value);
            window.location.reload();
          }
        );
      }
    } else {
      if (this.UserData.rol === 'user') {
        alert('Complete todos los campos requeridos del alumno');
      } else if (this.UserData.rol === 'profesor') {
        alert('Debe completar una especialidad válida (mínimo 3 caracteres)');
      }
    }
  }

  canSubmitForm(): boolean {
    if (this.UserData.rol === 'user') {
      // Para alumnos, validar todo el formulario
      return this.profileForm.valid;
    } else if (this.UserData.rol === 'profesor') {
      // Para profesores, solo validar que la especialidad sea válida si no está vacía
      const especialidad = this.profileForm.get('especialidad')?.value;
      
      if (!especialidad || especialidad.trim() === '') {
        return false; // No permitir enviar si está vacía
      }
      
      // Si tiene contenido, validar que no tenga errores
      const especialidadControl = this.profileForm.get('especialidad');
      return !especialidadControl?.hasError('minlength') && 
             !especialidadControl?.hasError('maxlength') && 
             !especialidadControl?.hasError('pattern');
    }
    
    return false;
  }

  shouldEditUser(): boolean {
    if (this.UserData.rol === 'user') {
      return this.AlumData !== null && Object.values(this.AlumData).some((value) => value !== null && value !== '');
    } else if (this.UserData.rol === 'profesor') {
      return this.ProfData !== null && Object.values(this.ProfData).some((value) => value !== null && value !== '');
    } else {
      return false;
    }
  }


  verPlanif(dni: string) {
    if (this.AlumData !== null && Object.values(this.AlumData).some((value) => value !== null && value !== '')) {
      const parametrosOcultos = {
        dni: dni
      };

      this.router.navigate(['/vPlanif'], { state: parametrosOcultos });

    } else {
      alert("Complete los datos del alumno")

    }
  }
}