import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { user } from 'src/app/Interfaces/user';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  token = null;
  users: user[];
  permisos=null;
  public edituser: boolean = false;
  public editproduct: boolean = false;
  public delete: boolean = false;
  
  constructor(private authService:AuthService, private router:Router) {
    this.authService.verificar();
    this.getuser();
    this.permisos=jwt_decode(this.token).features;
    this.loadData(this.permisos);
   }

  ngOnInit(): void {
  }
  refrezcar(){
    this.authService.refresh();
  }
  getuser(){
    this.token=this.authService.token();
    console.log(this.token);
    this.authService.getDatos(this.token).subscribe((data: user[]) => {
      this.users = data;
      
      console.log(data);

    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 
      500
      if(err){
        console.log("Tiempo expirado");
        this.timeout();
      }
      console.log(err)
    });
   
  }
  timeout(){
    this.authService.remove();
    this.router.navigate(["login"]);
  }
  handleError(error) {
    alert ("Tiempo expirado");
    console.log("Tiempo expirado");
    
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
}
