import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';


@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css']
})
export class DeliveryPageComponent implements OnInit {

  constructor(private _customerService:CustomerService) { }
  token = localStorage.getItem('customer_token');
  orders:any;
  customerName : any;
  img : any;

  async ngOnInit() {
    this.getUser()
    const response = await this._customerService.getOrders(this.token)
    this.orders = response.data.data.map((order:any) => {
      order.isShow = true
      order.btnText = 'More'
      return order
    })
  }

  async getUser(){
    let user_id = localStorage.getItem('customer');
    const response = await this._customerService.getCustomerProfile(user_id, this.token);
    this.customerName = response.data.data.firstname+" "+response.data.data.lastname
    this.img = response.data.data.image
  }

  toggleCollapse(order:any) {
    const orderIndex = this.orders.findIndex((ord:any) => ord.id == order.id)
    order = this.orders[orderIndex]
    order.isShow = !order.isShow
    order.btnText = order.isShow ? 'More' : 'Hide'

    this.orders.forEach((ord:any) => {
      if (ord.id != order.id) {
        ord.isShow = true
        ord.btnText = 'More'
      }
    });
  }
}
