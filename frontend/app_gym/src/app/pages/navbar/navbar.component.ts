import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  rutavisible = true;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutavisible = event.url !== '/login';
      }
    });
  }
  

  scrollToPrecio() {
    const rutaActual = this.router.url;

    if (rutaActual === '/login') {
      this.router.navigate(['/home']).then(() => {
        const elementoDestino = document.getElementById('Promosid');
        if (elementoDestino) {
          elementoDestino.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      const elementoDestino = document.getElementById('Promosid');
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToProfes() {
    const rutaActual = this.router.url;

    if (rutaActual === '/login') {
      this.router.navigate(['/home']).then(() => {
        const elementoDestino = document.getElementById('Profesid');
        if (elementoDestino) {
          elementoDestino.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      const elementoDestino = document.getElementById('Profesid');
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToContacto() {
    const rutaActual = this.router.url;

    if (rutaActual === '/login') {
      this.router.navigate(['/home']).then(() => {
        const elementoDestino = document.getElementById('Contactosid');
        if (elementoDestino) {
          elementoDestino.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      const elementoDestino = document.getElementById('Contactosid');
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

