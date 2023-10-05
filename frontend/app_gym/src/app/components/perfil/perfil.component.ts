import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  UserData: any;
  AlumData: any;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
    ) {}

  ngOnInit(): void {
    const userDNI = this.usuariosService.getUserDNIFromToken();
    if (userDNI) {
      this.usuariosService.getUser(userDNI).subscribe(data => {
        this.UserData = data;
        console.log('UserData: ', this.UserData);
      });
      this.usuariosService.getUserAlum(userDNI).subscribe(data1 => {
        this.AlumData = data1;
        console.log('AlumData: ', this.AlumData);
      });
    } else {
      console.error('No se pudo obtener el DNI del token.');
    }
  }

  selectedRole = localStorage.getItem('role')
}