import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-alumno-planificacion',
  templateUrl: './vista-alumno-planificacion.component.html',
  styleUrls: ['./vista-alumno-planificacion.component.css']
})
export class VistaAlumnoPlanificacionComponent {
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