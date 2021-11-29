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

  async ngOnInit() {
    console.log(await this._customerService.order(this.token))
  }

}
