import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  selectedRole = localStorage.getItem('role')
  
  arrayUserData = [
    {
      mail:'mrsaractunga@gmail.com',
      tel:'261455471',
      edad:'25',
      peso:'65',
      altura:'1.77',
      sexo:'Mujer ',
      especialidad:'Muzcualción',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayAlumData: ', this.arrayUserData);
  }
}