import { Component } from '@angular/core';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
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