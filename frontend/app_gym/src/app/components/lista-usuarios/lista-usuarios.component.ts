
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
    this.router.navigate(['/vPerfil', dni]);
  }

  cargarPaginaSiguiente() {
    const nextPage = this.currentPage + 1;
  
    // Call the usuariosService to fetch data for the next page
    this.usuariosService.getUsers(nextPage).subscribe((data: any) => {
      if (data.usuarios && data.usuarios.length > 0) {
        // If there are users on the next page, update the currentPage and load the data
        this.currentPage = nextPage;
        this.cargarUsuarios();
      } else {
        // If there are no users on the next page, you can choose to handle it (e.g., display a message)
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