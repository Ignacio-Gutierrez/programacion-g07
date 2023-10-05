import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getPlanif(userDNI: number){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/planificacion_a/' + userDNI, {headers: headers});
  }

}
