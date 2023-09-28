import { Component } from '@angular/core';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  selectedRole = localStorage.getItem('role')
  arrayDesPlan = [
    {
      des:'Hipertrofia',
      fecha:'07-09-2023',
    },
  ]
  arrayPlan = [
    {
      dia:'Lunes',
      des:'  recibir input',
    },
    {
      dia:'Martes',
      des:'  recibir input',
    },
    {
      dia:'Miércoles',
      des:'  recibir input',
    },
    {
      dia:'Jueves',
      des:'  recibir input',
    },
    {
      dia:'Viernes',
      des:'  recibir input',
    },
    {
      dia:'Sábado',
      des:'  recibir input',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayDesPlan: ', this.arrayDesPlan);
    console.log('arrayPlan: ', this.arrayPlan);
  }
}