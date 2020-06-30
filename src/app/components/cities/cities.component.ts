import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { cities } from 'src/app/Interfaces/cities';
import { Location } from 'src/app/Interfaces/location';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  datos: Location[];
  cities: cities[];
  location: Location[];
  constructor(private locationService:LocationService, private router:Router) { 
    this.getcities();
  }

  ngOnInit(): void {
  }
  
  getcities(){
    this.locationService.getDatos().subscribe((data: cities) => {
      //this.datos = JSON.parse(data);
      this.datos = data.cityModel;
      console.log('this.datos ',this.datos );
      /*
      data.cityModel.forEach(function (value) {
      console.log(value);
    });
      */
      //console.log(this.datos);
    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 

    });
   
  }
}
