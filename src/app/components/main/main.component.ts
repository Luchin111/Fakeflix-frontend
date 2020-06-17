import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { user } from 'src/app/Interfaces/user';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  token = null;
  refresh = null;
  tokenInfo=null;
  permisos=null;
  exp=null
  users: user[];
  public edituser: boolean = false;
  public editproduct: boolean = false;
  public delete: boolean = false;
  constructor(private authService:AuthService, private router:Router) { 
    this.token=this.authService.token();
    this.refresh=this.authService.refresh();
    this.authService.verificar();
    this.getuser();
    this.timesession();
    }

  ngOnInit(): void {
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  getuser(){
    var decoded = jwt_decode(this.token); 
    console.log(decoded); 
    var decoded2 = jwt_decode(this.refresh); 
    console.log(decoded2);  
    console.log(this.token);
    console.log(this.refresh);
    this.permisos=jwt_decode(this.token).features;
    this.loadData(this.permisos);
    this.exp=jwt_decode(this.refresh).exp;
    
    console.log(this.permisos);
    this.authService.getDatos(this.token).subscribe((data: user[]) => {
      this.users = data;
      console.log(data);
    });
  }
  salir(){
    this.authService.remove();
    this.router.navigate(["login"]);
  }
  loadData(permisos) {
      for (let marker of permisos) {
        if (marker == "PAGE_PRODUCT_MANAGEMENT") {
          console.log("Puede gestionar productos")
          this.editproduct=true;
          
        }
        if (marker == "BUTTON_DELETE_USER") {
          console.log("Puede eliminar usuarios")
          this.edituser=true;
        }
        if (marker == "PAGE_USER_MANAGEMENT") {
          console.log("Puede gestionar usuarios")
          this.delete=true;
        }
      }
    
  }
  timesession(){
    
    console.log(this.authService.gethour());
    console.log(this.exp);
  }
}
