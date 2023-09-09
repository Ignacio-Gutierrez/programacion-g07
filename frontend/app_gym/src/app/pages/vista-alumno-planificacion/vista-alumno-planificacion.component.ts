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