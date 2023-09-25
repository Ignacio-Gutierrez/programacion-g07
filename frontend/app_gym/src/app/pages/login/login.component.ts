import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  selectedRole: string | null = null;

  selectRole(role: string) {
    this.selectedRole = role;

    localStorage.setItem('selectedRole', role);
  }
  
  constructor(private router: Router) {}

  login() {
    if (this.selectedRole === 'alumno') {
      this.router.navigate(['/vPerfil']);
    } else if (this.selectedRole === 'profesor') {
      this.router.navigate(['/vInicio']);
    } else if (this.selectedRole === 'admin') {
      this.router.navigate(['/vInicio']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}

