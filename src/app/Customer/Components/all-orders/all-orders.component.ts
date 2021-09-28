import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
import { Orders } from 'src/app/Customer/Common/model/customer-model';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
<<<<<<< HEAD
  form = new FormGroup({
    data: new FormControl('', [
=======
  form = new FormGroup ({
    data : new FormControl('', [
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
      Validators.required
    ])
  });
  token = localStorage.getItem('customer_token');

<<<<<<< HEAD
  orders!: Orders[];

  constructor(private service: CustomerService, private router: Router) { }
=======
  orders! : Orders[];

  constructor( private service : CustomerService, private router : Router) {}
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5

  ngOnInit(): void {
    this.getOrders();
  }

  async getOrders() {
<<<<<<< HEAD
    axios.get("http://127.0.0.1:8000/api/orders", ).then(res => {
      // const result = await this.service.orders(this.token);
      // this.orders = result.data.data;
      console.log(this.orders);
    })
=======
    const result = await this.service.orders(this.token);
    this.orders = result.data.data;
    console.log(this.orders);
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
  }

}
