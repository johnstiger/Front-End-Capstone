import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { Orders } from 'src/app/Customer/Common/model/customer-model';
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
  token = localStorage.getItem('customer_token');

  orders!: Orders[];

  constructor(private service: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  async getOrders() {
    const result = await this.service.order(this.token);
    this.orders = result.data.data;
    console.log(this.orders);
  }
  
}
