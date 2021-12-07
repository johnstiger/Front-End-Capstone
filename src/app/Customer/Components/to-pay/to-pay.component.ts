import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service'

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.css']
})
export class ToPayComponent implements OnInit {

  constructor(public _customerService: CustomerService) { }
  orders:any
  selectedOrderId:any
  products:any
  protected token = localStorage.getItem('customer_token')
  customerName : any;
  status : any;
  img : any;
  subtotal : any;
  display : boolean = false;

  async ngOnInit() {
    this.getUser();
    const  response = await this._customerService.getOrders(this.token)
    this.orders = response.data.data
    console.log(response.data.data);
    if(this.orders == undefined){
      this.display = true
    }else{
      this.selectedOrderId = this.orders[0].id
      this.products = this.orders[0].products
      this.status = this.orders[0].status
      this.subtotal = this.orders[0].total
    }

  }

  selectOrder() {
    this.products = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].products
    this.status = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].status
    this.subtotal = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].total
  }

  async getUser(){
    this._customerService.showLoading();
    let user_id = localStorage.getItem('customer');
    const response = await this._customerService.getCustomerProfile(user_id, this.token);
    this.customerName = response.data.data.firstname+" "+response.data.data.lastname
    this._customerService.closeLoading();
    this.img = response.data.data.image
  }

  async removeItem(orderId : any, productId:any){
    this._customerService.showLoading();
    let data = {data:productId};
    const response = await this._customerService.removeProductOrder(orderId, data, this.token);
    if(response.data.error){

    }else{
      this._customerService.ShowSuccessMessage(response.data.message);
      setTimeout(()=>{
        this.ngOnInit();
      },1500)
    }
  }


}
