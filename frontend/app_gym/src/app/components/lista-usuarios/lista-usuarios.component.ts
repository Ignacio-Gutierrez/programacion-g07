
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
  searchby_nombre: string = '';

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  newUser: any = {
    dni: null,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: null,
    rol: '',
  };

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

  buscarUsuarios() {
    // Verifica que haya un término de búsqueda
    if (this.searchby_nombre.trim() !== '') {
      // Realiza una solicitud HTTP al backend con el término de búsqueda
      this.usuariosService.searchUsers(this.searchby_nombre).subscribe((data: any) => {
        // Actualiza la lista de usuarios en el frontend con los resultados de la búsqueda
        this.arrayUsers = data.usuarios;
      });
    } else {
      // Si no hay término de búsqueda, carga todos los usuarios
      this.cargarUsuarios();
    }
  }
  
  buscarConEnter(event: KeyboardEvent) {
    // Manejar la pulsación de "Enter"
    if (event.key === 'Enter') {
      this.buscarUsuarios();
    }
  }
  
  crearUsuario() {
    this.usuariosService.createUser(this.newUser).subscribe((data: any) => {
      // Lógica para manejar la respuesta después de crear el usuario
      console.log('Usuario creado:', data);
      // Recargar la lista de usuarios o realizar otra acción necesaria
      this.cargarUsuarios();
    });
  }


  selectedRole = localStorage.getItem('role');
}