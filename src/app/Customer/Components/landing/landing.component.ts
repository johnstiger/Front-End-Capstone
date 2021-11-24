import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import axios from 'axios';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { CustomerService } from '../../Services/customer.service';
import { NotificationService } from 'src/app/Common/Services/notification.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  form = new FormGroup ({
    data : new FormControl ('', [
      Validators.required
    ])
  })
  token = localStorage.getItem('customer_token');

  products! : Products[];

  constructor(
    private router: Router,
    private service: CustomerService,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    const result = await this.service.products(this.token);
    this.products = result.data.data;
    console.log(this.products);
  }



}
