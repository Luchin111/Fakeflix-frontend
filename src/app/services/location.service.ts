
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient, private router:Router) { }


  getDatos(): Observable<any> {
    
    return this.httpClient.get('http://localhost:8008/api/v1/city').pipe(map(response => response));
  }
}
