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

  async ngOnInit() {
    const  response = await this._customerService.getOrders(this.token)
    this.orders = response.data.data
    this.selectedOrderId = this.orders[0].id
    this.products = this.orders[0].products
  }

  selectOrder() {
    this.products = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].products
  }
}
