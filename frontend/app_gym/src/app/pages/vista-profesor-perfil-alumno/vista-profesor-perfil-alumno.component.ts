import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-profesor-perfil-alumno',
  templateUrl: './vista-profesor-perfil-alumno.component.html',
  styleUrls: ['./vista-profesor-perfil-alumno.component.css']
})
export class VistaProfesorPerfilAlumnoComponent {
  arrayAlumData = [
    {
      mail:'mrsaractunga@gmail.com',
      tel:'261455471',
      edad:'25',
      peso:'65',
      altura:'1.77',
      sexo:'Mujer ',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayAlumData: ', this.arrayAlumData);
  }
}
