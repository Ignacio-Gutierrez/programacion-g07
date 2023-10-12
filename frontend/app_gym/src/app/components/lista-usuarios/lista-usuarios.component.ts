
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
    const parametrosOcultos = {
      dni: dni
    };
  
    this.router.navigate(['/vPerfil'], { state: parametrosOcultos });
  }

  cargarPaginaSiguiente() {
    const nextPage = this.currentPage + 1;
  
    this.usuariosService.getUsers(nextPage).subscribe((data: any) => {
      if (data.usuarios && data.usuarios.length > 0) {
        this.currentPage = nextPage;
        this.cargarUsuarios();
      } else {
        console.log('No users on the next page.');
      }
    });
  }
  
  cargarPaginaPrevia() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarUsuarios();
    }
  }

  selectedRole = localStorage.getItem('role');
}