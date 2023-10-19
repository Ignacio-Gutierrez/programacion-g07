import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getUsers(page: number) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    return this.httpClient.get(this.url + '/usuarios', {
      headers: headers,
      params: { page: page.toString() }
    });
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
      return this.httpClient.get(this.url + '/usuario/' + userDNI, {headers: headers});
  }

  getUserAlum(userDNI: number){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/usuario_a/' + userDNI, {headers: headers});
  }

  getUserProf(userDNI: number){
    let auth_token=localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/usuario_p/' + userDNI, {headers: headers});
  }


  searchUsers(searchTerm: string): Observable<any> {
    let auth_token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });

    return this.httpClient.get(this.url + '/usuarios', {
      headers: headers,
      params: { search_term: searchTerm }
    });
  }
  
  
  createUser(userData: any) {
    const auth_token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.post(this.url + '/usuarios', userData, { headers: headers });
  }
}
