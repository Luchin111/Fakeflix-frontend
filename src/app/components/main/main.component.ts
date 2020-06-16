import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { user } from 'src/app/Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  token = null;
  refresh = null;
  users: user[];
  constructor(private authService:AuthService, private router:Router) { 
    this.authService.verificar();
    this.getuser();
    
    }

  ngOnInit(): void {
  }

  getuser(){
    this.token=this.authService.token();
    this.refresh=this.authService.refresh();
    console.log(this.token);
    console.log(this.refresh);
    this.authService.getDatos(this.token).subscribe((data: user[]) => {
      this.users = data;
      console.log(data);
    });
  }
  salir(){
    this.authService.remove();
    this.router.navigate(["login"]);
  }

  
}
