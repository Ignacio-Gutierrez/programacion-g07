import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  selectedRole = localStorage.getItem('role')

  private perfilDni: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.perfilDni = params['dni'];
    });
  }

  verPerfil(dni: string) {
    this.router.navigate(['/vPerfil', dni]);
  }
  
}