import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-admin-perfil-alumno',
  templateUrl: './vista-admin-perfil-alumno.component.html',
  styleUrls: ['./vista-admin-perfil-alumno.component.css']
})
export class VistaAdminPerfilAlumnoComponent {
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
