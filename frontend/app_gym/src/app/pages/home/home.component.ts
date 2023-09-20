import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  arrayPromos = [
    {
      mes:'1 Mes',
      precio:'$9.999',
      info:'1 mes de suscripción estándar.',
    },
    {
      mes:'3 Meses',
      precio:'$24.999',
      info:'Oferta por 3 meses de suscripción.',
    },
    {
      mes:'6 Meses',
      precio:'$44.999',
      info:'Oferta por 6 meses de suscripción.',
    },
    {
      mes:'1 Año',
      precio:'$84.999',
      info:'Oferta por 1 año de suscripción.',
    }
  ]
  arrayProfes = [
    {
      foto:'assets/profe2.jpg',
      nombre:'Alejandra Oliveras',
      info:'Entrenadora personal y campeona de Boxeo.',
    },
    {
      foto:'assets/profe3.jpg',
      nombre:'Arnold Schwarzenegger',
      info:'Entrenador personal y culturista profesional.',
    },
    {
      foto:'assets/profe4.jpg',
      nombre:'Johnny Lawrence',
      info:'Sensei de Karate.',
    },
    {
      foto:'assets/profe5.jpg',
      nombre:'Logan Chitwood',
      info:'Entrenador personal.',
    },
    {
      foto:'assets/profe6.jpg',
      nombre:'Chuck Norris',
      info:'Artista marcial y sensei Karate.',
    },
    {
      foto:'assets/profe7.jpg',
      nombre:'Cassius Clay',
      info:'Entrenador personal y boxeador amateur.',
    },
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('arrayPromos: ', this.arrayPromos);
    console.log('arrayProfes: ', this.arrayProfes);
  }
}
