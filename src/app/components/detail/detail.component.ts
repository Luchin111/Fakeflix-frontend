import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../services/orders.service'
import { from } from 'rxjs';
import { Orders } from 'src/app/Interfaces/orders';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public id;
  public Detail:any;
  constructor(private order:OrdersService, private actRoute:ActivatedRoute) {
    this.getDetails();
   }

  ngOnInit(): void {
  }
  getDetails(){
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.order.getDetails(this.id).subscribe(res=>{
      console.log('res:',res);
      this.Detail=res;
    },error=>console.error('error:1 ',error));
  }

}
