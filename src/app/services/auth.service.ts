import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { Refresh } from '../Interfaces/refresh';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8008/api/v1/security/login'; 
  private baseUrl1 = 'http://localhost:8008/api/v1/security/refresh'; 
  constructor(private httpClient:HttpClient, private router:Router) {
   }
  login(data) {
    return this.httpClient.post(this.baseUrl, data)
  }
  
  refresh() {
    let token = this.getToken();
    let refresh = this.getRefresh();
    let headers = new HttpHeaders().set('Authorization','bearer '+ token);
    let objRefresh = new Refresh();
    objRefresh.refreshToken = refresh;
    return this.httpClient.post(this.baseUrl1, objRefresh, { headers: headers })

  }

  getToken(){
    return localStorage.getItem('token');
  }
  getRefresh(){
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

  remove() {
    localStorage.removeItem('token');
  }
  getDatos(token): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.get('http://localhost:8008/api/v1/user', { headers: headers });
  }
  verificar(){
    if(this.getToken()){
      console.log("session ok");
    }else{
      this.router.navigate(["login"]);
    }
  }
  gethour(){
    const current = new Date();
    const timestamp = current.getTime();
    return timestamp;
  }
}