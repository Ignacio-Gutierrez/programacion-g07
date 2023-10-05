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

  private perfilDni: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    const userDNI = this.usuariosService.getUserDNIFromToken();

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = params['dni'];
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
  
  verPlanif(dni: string) {
    this.router.navigate(['/vPlanif', dni]);
  }
}