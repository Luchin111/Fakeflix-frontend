import { Component, OnInit } from '@angular/core';
import _  from 'underscore';
import {OrdersService} from '../../services/orders.service'
import { from } from 'rxjs';
import { Orders } from 'src/app/Interfaces/orders';
import { AuthService } from 'src/app/services/auth.service';
enum States{
  Pagados,
  Preparados,
  Despachados,
  Entregados
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private list:Orders[];
  public group:any[];
  public pagados:any[];
  public preparados:any;
  public despachados:any;
  public entregados:any;
  constructor(private order:OrdersService, private auth:AuthService) 
  { 
    this.getOrders();
    this.auth.verificar();

  }

  ngOnInit(): void {

  }
  getOrders(){
    this.order.getOrders().subscribe(res=>{
      console.log('res:',res);
      let list:any = res;
      this.list=list;
      console.log(_.groupBy(this.list,'status'))
      this.group = _.groupBy(this.list,'status');

      this.auth.refresh().subscribe(res=>{
        console.log('res:',res);
        let response:any = res;
        this.auth.setauth( response.authentication);
        this.auth.setref( response.refresh);
      },error=>console.error('error:',error));

      this.pagados = this.group[1];
      console.log('this.pagados',this.pagados);
      this.preparados = this.group[2];
      this.despachados = this.group[3];
      this.entregados = this.group[4];

    },error=>console.error('error:',error));
  }

  

}
