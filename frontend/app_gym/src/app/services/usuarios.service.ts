import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getUsers(){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/usuarios', {headers: headers});
  }

}