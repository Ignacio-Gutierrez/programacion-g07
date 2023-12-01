import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getClases(){  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
      return this.httpClient.get(this.url + '/clases', {headers: headers});
  }

  getClase(claseID: number){
    let auth_token=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/clase/' + claseID, {headers: headers});
  }

  getClaseProfesor(profDNI: number){
    let auth_token=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`   
    });
      return this.httpClient.get(this.url + '/clases_por_profesor/' + profDNI, {headers: headers});
  }
   
  createClase(claseData: any) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.post(this.url + '/clases', claseData, { headers: headers });
  }

  updateClase(id: number, claseData: any) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.put(this.url + '/clase/' + id, claseData, { headers: headers });
  }
  
  deleteClase(id: number) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.delete(this.url + '/clase/' + id, { headers: headers });
  }
}