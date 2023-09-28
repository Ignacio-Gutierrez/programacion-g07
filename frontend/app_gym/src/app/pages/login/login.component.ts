import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router : Router
  ) {}

  login(dataLogin:any = {} ){
    dataLogin = {email: 'c.portal@alumno.um.edu.ar', password: 'hola123'}
    console.log('comprobando credenciales');
    this.authService.login(dataLogin).subscribe({
      next: (rta:any) => {
        console.log('Respuesta login: ',rta.access_token);
        localStorage.setItem('token', rta.access_token)
        this.router.navigateByUrl('vPerfil');
      }, error:(error) => {
          alert('Credenciales incorrectas');
          localStorage.removeItem('token');
      }, complete: () => {
        console.log('Finalizo')
      }
    })
  }
}

