import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { user } from 'src/app/Interfaces/user';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  token = null;
  users: user[];
  constructor(private authService:AuthService, private router:Router) {
    this.authService.verificar();
    this.getuser();
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
}
