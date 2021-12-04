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

  async ngOnInit() {
    const response = await this._customerService.getOrders(this.token)
    this.orders = response.data.data.map((order:any) => {
      order.isShow = true
      order.btnText = 'More'
      return order
    })
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
