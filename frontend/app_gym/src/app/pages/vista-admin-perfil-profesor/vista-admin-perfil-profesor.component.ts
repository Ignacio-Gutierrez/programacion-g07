import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-admin-perfil-profesor',
  templateUrl: './vista-admin-perfil-profesor.component.html',
  styleUrls: ['./vista-admin-perfil-profesor.component.css']
})
export class VistaAdminPerfilProfesorComponent {
arrayProfData = [
  {
    mail:'mrsaractunga@gmail.com',
    tel:'261455471',
    dni:'25232567',
    especialidad:'Muzcualción',
  },
]
constructor() {}

ngOnInit(): void {
  console.log('arrayProfData: ', this.arrayProfData);
}
}