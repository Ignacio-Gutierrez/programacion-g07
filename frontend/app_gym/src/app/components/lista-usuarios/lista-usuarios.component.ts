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

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ){}
  
  ngOnInit() {
    this.usuariosService.getUsers().subscribe((data:any) =>{
      console.log('JSON data:', data);
      this.arrayUsers = data.usuarios;
    })
  }


  editarUsuario(usuario:any){
    console.log('Usuario a editar', usuario);
    this.router.navigateByUrl('/usuario/'+usuario.id+'/Editar')
  }

  selectedRole = localStorage.getItem('selectedRole');
}
