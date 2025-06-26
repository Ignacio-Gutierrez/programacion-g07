
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit {
  newUserForm!: FormGroup;
  editUserForm!: FormGroup;
  arrayUsers: any;
  currentPage: number = 1;
  perPage: number = 10;
  filtroRol: string = '';
  searchTerm: string = '';

  actualContraseña: string = ''

  usuarioAEditar: any = {
    dni: null,
    nombre: null,
    apellido: null,
    email: null,
    password: null,
    telefono: null,
    rol: null,
  };

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) {

    this.newUserForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,8}$/), Validators.minLength(7), Validators.maxLength(8)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      rol: ['', Validators.required],
    });

    this.editUserForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
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
      this.cargarUsuarios();
    }
  }


  crearUsuario() {
    if (this.newUserForm.valid) {
      this.usuariosService.registerUser(this.newUserForm.value).subscribe(
        (data: any) => {
          console.log('Usuario creado:', data);
          this.cargarUsuarios();
        },
      );
    } else {
      alert('Error al crear usuario. Por favor, complete el formulario correctamente.');
    }
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

