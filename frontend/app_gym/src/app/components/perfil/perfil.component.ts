import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  selectedRole = localStorage.getItem('role');
  UserData: any;
  AlumData: any;
  ProfData: any;

  newAlumData: any;
  newProfData: any;

  private perfilDni: any;
  private parametrosOcultos: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

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
  
  editarCrearAlumProf() {

    if (this.UserData.rol === 'user') {
      if (this.AlumData) {
        this.usuariosService.updateUserAlum(this.perfilDni, this.newAlumData).subscribe(
          (response) => {
            console.log('Alumno actualizado con éxito', response);
          },
        );
      } else {
        this.newAlumData.dni = this.perfilDni;
        this.usuariosService.createUserAlum(this.newAlumData).subscribe(
          (response) => {
            console.log('Alumno creado con éxito', response);
          },
        );
      }
    } else if (this.UserData.rol === 'profesor' || this.UserData.rol === 'admin') {
      if (this.ProfData) {
        this.usuariosService.updateUserProf(this.perfilDni, this.newProfData).subscribe(
          (response) => {
            console.log('Profesor actualizado con éxito', response);
          },
        );
      }
    }
  }
  

  verPlanif(dni: string) {
    const parametrosOcultos = {
      dni: dni
    };
  
    this.router.navigate(['/vPlanif'], { state: parametrosOcultos });;
  }
}