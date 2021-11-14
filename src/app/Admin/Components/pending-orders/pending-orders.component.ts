import { Component, OnInit } from '@angular/core';
import { Data, Orders } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})

// Kani wa pa gyapon na trabaho
// Paabuton nalang mahuman ang back end ani

export class PendingOrdersComponent implements OnInit {

  constructor(private http : AdminService) { }

  token = localStorage.getItem('admin_token');
  orders! : Orders [];
  data : Data[] = [];

  ngOnInit(): void {
    this.getPendingOrders();
  }

  searchProducts(){

  }

  getPendingOrders(){
    this.http.loading();
    this.http.pendingOrders(this.token).then((result) =>{
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message)
      }else{
        this.orders = result.data.data;
      }
      this.http.closeLoading();
    })
  }


  confirm(orderId : any, customerId : any){
    this.data = [{
      id : orderId
    }]
    this.http.loading();
    this.http.confirmOrder(customerId, this.data, this.token).then((result)=>{
      console.log(result.data);
      if(result.data.error){
          this.http.ShowErrorMessage(result.data.message);
      }else{
          this.http.ShowSuccessMessage(result.data.message);
          setTimeout(()=>{
            this.ngOnInit();
          }, 2000);
      }
      // this.http.closeLoading();
    });
  }

  declined(orderId : any, customerId : any){
    this.data = [{
      id : orderId
    }]
    this.http.loading();
    this.http.declineOrder(customerId, this.data, this.token).then((result)=>{
      console.log(result.data);
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message);
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.ngOnInit();
        }, 2000);
      }
      // this.http.closeLoading();
    });
  }

}
