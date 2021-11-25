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
  display ='none';
  customerName : any;
  customerOrders : Array<any> = [];
  orderId : any;
  customerId : any;
  cp : number = 1;

  ngOnInit(): void {
    this.getPendingOrders();
  }

  // Kulang Pani
  searchProducts(){

  }

  // Get All Pending Orders
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

  // Confirm Order Purchase
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
        this.onCloseHandled();
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.ngOnInit();
        }, 2000);
      }
    });
  }

  // Declin Order Purchase
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
    });
  }

  // Pop Up Modal
  openModal(order : any){
    this.display='block';
    this.orderId = order.id;
    this.customerId = order.customer.id;
    this.customerName = order.customer.firstname+" "+order.customer.lastname;
    this.customerOrders = order.products
    // Filter product sizes
    this.customerOrders = this.customerOrders.map(res => {
      const result = res.sizes.map((value : any) => {
        if(value.id === res.pivot.size_id){
          return value.size
        }
      })
      var test = result.filter((removeUndefine : any) =>{
        return removeUndefine;
      });

      if(result.length > 0){
        res['sizes'] = test;
      }
      return res;
    })
 }

  // Close Pop Up Modal
  onCloseHandled(){
    this.display='none';
  }

}
