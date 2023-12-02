
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit{
  newUserForm!: FormGroup;
  editUserForm!: FormGroup;
  arrayUsers: any;
  currentPage: number = 1;
  perPage: number = 10;
  filtroRol: string = '';
  searchTerm: string = '';
  
  actualContraseña: string= ''

  usuarioAEditar: any = {
    dni: null,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: null,
    rol: '',
  };

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) {
    
    this.newUserForm = this.formBuilder.group({
      dni: [''],
      nombre: [''],
      apellido: [''],
      email: [''],
      password: [''],
      telefono: [''],
      rol: [''],
   });

   this.editUserForm = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    email: [''],
    password: [''],
    telefono: [''],
   });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsers(this.currentPage, this.perPage, this.filtroRol)
    .subscribe((data: any) => {
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
  
    this.usuariosService.getUsers(nextPage, this.perPage, this.filtroRol).subscribe((data: any) => {
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

  filtrarUsuarios(rol: string) {
    this.filtroRol = rol;
    this.currentPage = 1;
    this.cargarUsuarios();
}
  eliminarFiltro() {
    this.filtroRol = '';
    this.currentPage = 1;
    this.cargarUsuarios(); 
  }


  buscarUsuarios() {
    if (this.searchTerm.length >= 3 || this.filtroRol) {
        this.usuariosService.searchUsers(this.searchTerm, this.filtroRol).subscribe((data: any) => {
            this.arrayUsers = data.usuarios;
        });
    } else {
        // Si el término de búsqueda tiene menos de 3 caracteres o no hay filtro de roles, puedes mostrar un mensaje de error o limpiar la lista de usuarios.
        this.cargarUsuarios();
    }
}

  
  crearUsuario() {
    this.usuariosService.createUser(this.newUserForm.value).subscribe((data: any) => {
      // Lógica para manejar la respuesta después de crear el usuario
      console.log('Usuario creado:', data);
      // Recargar la lista de usuarios o realizar otra acción necesaria
      this.cargarUsuarios();
    });
  }

  saveDni(user: any) {
    this.usuarioAEditar = user;
    this.actualContraseña = user.password;
    this.editUserForm.setValue({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password,
      telefono: user.telefono,
    })
  }
  
  editarUsuario() {
    if (this.actualContraseña === this.editUserForm.value.password) {
      delete this.editUserForm.value.password;
    }
    
    this.usuariosService.updateUser(this.usuarioAEditar.dni, this.editUserForm.value).subscribe((data: any) => {
      console.log('Usuario editado:', data);
      this.cargarUsuarios();
    });
  }
  
  
  
  selectedRole = localStorage.getItem('role');
}

