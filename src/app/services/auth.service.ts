import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8008/api/v1/security/login'; 
  constructor(private httpClient:HttpClient, private router:Router) {
   }
  login(data) {
    return this.httpClient.post(this.baseUrl, data)
  }
  token(){
    return localStorage.getItem('token');
  }
  refresh(){
    return localStorage.getItem('refresh');
  }
  setauth(token) {

      localStorage.setItem('token', 'bearer '+token);
  }
  getauth() {

    localStorage.getItem('token');
  }
  setref(refresh) {

    localStorage.setItem('refresh',refresh);
  }
  getref() {

    localStorage.getItem('refresh');
  }
  refrezcar(){
    return this.httpClient.post('http://localhost:8008/api/v1/security/refresh',this.refresh());
  }
  remove() {
    localStorage.removeItem('token');
  }
  getDatos(token): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.get('http://localhost:8008/api/v1/user', { headers: headers });
  }
  verificar(){
    if(this.token()){
      console.log("session ok");
    }else{
      this.router.navigate(["login"]);
    }
  }
}