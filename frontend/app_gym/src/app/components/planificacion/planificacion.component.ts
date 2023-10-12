import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanificacionService } from 'src/app/services/planificacion.service';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  selectedRole = localStorage.getItem('role')

  UserPlanif: any;
  private parametrosOcultos:any;

  perfilDni: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planifiacionservice: PlanificacionService
  ) {}

  ngOnInit(): void {
    this.parametrosOcultos = history.state;
    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });

    this.planifiacionservice.getPlanif(this.perfilDni).subscribe(
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
  
}