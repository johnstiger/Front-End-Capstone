import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Customer/Services/customer.service';
import {
  Categories,
  Products,
  Sizes
} from 'src/app/Customer/Common/model/customer-model';

@Component({
  selector: 'app-my-order-page',
  templateUrl: './my-order-page.component.html',
  styleUrls: ['./my-order-page.component.css']
})
export class MyOrderPageComponent implements OnInit {
  constructor(private router: Router, private service: CustomerService) {}

  token = localStorage.getItem('customer_token');
  products!: [any];
  totalAmount: number = 0;

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('products') || '')
    this.products.forEach(product => {
      console.log(product.pivot.total)
      this.totalAmount += product.pivot.total
    });
    console.log(this.totalAmount)
  }

  async showProducts() {
    await this.service.showProducts(this.token).then(result => {
      if (!result.data.error) {
        this.products = result.data.data;
        console.log('mao ni', this.products);
      }
    });
  }

  async cancel() {
    this.router.navigate(['/cart']);
  }
}
