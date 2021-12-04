import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  form = new FormGroup({
    data: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private _customerService:CustomerService) { }
  token = localStorage.getItem('customer_token');
  products:any[] = [];

  async ngOnInit() {
    const response = await this._customerService.getOrders(this.token)
    response.data.data.forEach((order:any) => {
      this.products.push(...order.products)
      console.log(this.products)
    })
  }
}
