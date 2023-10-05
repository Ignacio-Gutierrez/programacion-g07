import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import jwtDecode from 'jwt-decode';

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

  getUserDNIFromToken(): number | null {
    let auth_token = localStorage.getItem('token');
    if (auth_token) {
      const decodedToken: any = jwtDecode(auth_token);
      return decodedToken.dni;
    }
    return null;
  }

  getUser(userDNI: number){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/usuario/' + userDNI);
  }

  getUserAlum(userDNI: number){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/usuario_a/' + userDNI);
  }

}