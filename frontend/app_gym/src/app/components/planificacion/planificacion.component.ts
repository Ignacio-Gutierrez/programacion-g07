import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  selectedRole = localStorage.getItem('role');
  UserPlanif: any;
  private parametrosOcultos: any;
  perfilDni: any = null;

  planificacionData: any = {
    descripcion: '',
    fecha: '',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: '',
    alumno_dni: null,
    profesor_dni: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planificacionService: PlanificacionService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    const userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });

    this.planificacionData.alumno_dni = this.perfilDni;
    this.planificacionData.profesor_dni = userDNI;

    this.planificacionService.getPlanif(this.perfilDni).subscribe(
      (userPlanif) => {
        this.UserPlanif = userPlanif;
        console.log('UserPlanif: ', this.UserPlanif);
      }
    );
  }

  verPerfil(dni: number) {
    const parametrosOcultos = {
      dni: dni
    };

    this.router.navigate(['/vPerfil'], { state: parametrosOcultos });
  }

  CrearPlanificacion() {
    // Formatea la fecha manualmente en formato "yyyy-MM-dd"
    const fechaParts = this.planificacionData.fecha.split('-');
    const fechaFormatted = `${fechaParts[0]}-${fechaParts[1]}-${fechaParts[2]}`;
    this.planificacionData.fecha = fechaFormatted;

    this.planificacionService.getPlanif(this.perfilDni).subscribe(
      (UserPlanif) => {
        if (Array.isArray(UserPlanif) && UserPlanif.length > 0) {
          this.planificacionService.updatePlanif(UserPlanif[0].id, this.planificacionData).subscribe(
            (response) => {
              console.log('Planification updated:', response);
              // Puedes realizar acciones adicionales aquí si es necesario
            },
            (error) => {
              console.error('Error updating planification:', error);
            }
          );
        } else {
          this.planificacionService.createPlanif(this.planificacionData).subscribe(
            (response) => {
              console.log('Planification created:', response);
              // Puedes realizar acciones adicionales aquí si es necesario
            },
            (error) => {
              console.error('Error creating planification:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking for existing planification:', error);
      }
    );
  }
}
