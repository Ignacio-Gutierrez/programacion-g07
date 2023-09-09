import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-admin-planificacion',
  templateUrl: './vista-admin-planificacion.component.html',
  styleUrls: ['./vista-admin-planificacion.component.css']
})
export class VistaAdminPlanificacionComponent {
  arrayDesPlan = [
    {
      des:'Hipertrofia',
      fecha:'07-09-2023',
    },
  ]
  arrayPlan = [
    {
      dia:'Lunes',
      des:'  revicir input',
    },
    {
      dia:'Martes',
      des:'  revicir input',
    },
    {
      dia:'Miércoles',
      des:'  revicir input',
    },
    {
      dia:'Jueves',
      des:'  revicir input',
    },
    {
      dia:'Viernes',
      des:'  revicir input',
    },
    {
      dia:'Sábado',
      des:'  revicir input',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayDesPlan: ', this.arrayDesPlan);
    console.log('arrayPlan: ', this.arrayPlan);
  }
}
