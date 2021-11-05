import { Component, OnInit } from '@angular/core';
import { Orders } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

// Wala pay back end url ani

export class OrdersComponent implements OnInit {

  token = localStorage.getItem('admin_token');
  constructor(private http : AdminService) { }

  errors : any;
  orders! : Orders[];
  message : any;
  ngOnInit(): void {
    this.getAllOrders();
  }

  searchProducts(){

  }


  getAllOrders(){
    this.http.loading();
    this.http.getAllOrders(this.token).then((result) => {
      console.log(result.data);
      if(result.data.error){
        this.errors = result.data.message
      }else if(result.data.message == 'No data yet!'){
        this.message = result.data.message
      }else{
        this.orders = result.data.data;
      }
      this.http.closeLoading();
    });
  }

}
