import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-profesor-planificacion',
  templateUrl: './vista-profesor-planificacion.component.html',
  styleUrls: ['./vista-profesor-planificacion.component.css']
})
export class VistaProfesorPlanificacionComponent {
  arrayDesPlan = [
    {
      des:'Hipertrofia',
      fecha:'07-09-2023',
    },
  ]
  arrayPlan = [
    {
      dia:'Lunes',
      des:'  revibir input',
    },
    {
      dia:'Martes',
      des:'  revibir input',
    },
    {
      dia:'Miércoles',
      des:'  revibir input',
    },
    {
      dia:'Jueves',
      des:'  revibir input',
    },
    {
      dia:'Viernes',
      des:'  revibir input',
    },
    {
      dia:'Sábado',
      des:'  revibir input',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayDesPlan: ', this.arrayDesPlan);
    console.log('arrayPlan: ', this.arrayPlan);
  }
}