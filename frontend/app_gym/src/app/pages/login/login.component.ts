import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import jwtDecode from 'jwt-decode';


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

        const decodedToken: any = jwtDecode(rta.access_token);
        localStorage.setItem('role', decodedToken.rol)

        if (localStorage.getItem('role') === 'admin') {
          this.router.navigateByUrl('vInicio');
        } else if (localStorage.getItem('role') === 'usuario') {
          this.router.navigateByUrl('vInicio');
        } else {

          console.error('Rol de usuario desconocido');
        }

      }, error:(error) => {
          alert('Credenciales incorrectas');
          localStorage.removeItem('role');
          localStorage.removeItem('token');
          
      }, complete: () => {
        console.log('Finalizo')
      }
    })
  }
}