import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensaje=null;
  public name: string='null';
   public form = {
    username: null,
    password: null,
  };
  public error = null;
  submitClicked: number;
  constructor(
    private router: Router,
    private Auth: AuthService,
    )
    { }

    onSubmit() {
      this.mensaje='true';
      this.submitClicked=1;
      this.Auth.login(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );

      
    }
    
  handleResponse(data) {
    this.submitClicked=0;
    this.router.navigate(["cities"]);
    alert ("Ingreso CORRECTO");
    this.Auth.setauth(data.authentication);
    this.Auth.setref(data.refresh);
    console.log(data.message);
  }

  handleError(error) {
    alert ("Datos Incorrectos");
    this.error = error.error.error;
  }

  ngOnInit(): void {
  }

}