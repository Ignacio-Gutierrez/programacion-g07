import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navclose',
  templateUrl: './navclose.component.html',
  styleUrls: ['./navclose.component.css']
})
export class NavcloseComponent {
  constructor(
    private authService: AuthService
  ) {}

  cerrarSesion() {
    this.authService.logout();
  }
}
