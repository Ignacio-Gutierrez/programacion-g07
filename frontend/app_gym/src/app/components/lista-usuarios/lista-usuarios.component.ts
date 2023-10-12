
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent {
  arrayUsers: any;
  currentPage: number = 1;
  maxPages: number = 3;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsers(this.currentPage).subscribe((data: any) => {
      console.log('JSON data:', data);
      this.arrayUsers = data.usuarios;
    });
  }

  verPerfil(dni: string) {
    this.router.navigate(['/vPerfil', dni]);
  }

  cargarPaginaSiguiente() {
    if (this.currentPage > 1) {
      this.currentPage++;
      this.cargarUsuarios();
    }
  }
  
  cargarPaginaPrevia() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarUsuarios();
    }
  }

  selectedRole = localStorage.getItem('role');
}