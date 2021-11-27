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
  salesItem : Array<any> = [];

  constructor(
    private router: Router,
    private service: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getSalesProduct();
  }

  async getProducts() {
    const result = await this.service.products(this.token);
    if(result.data.error){

    }else{
      this.products = result.data.data;
      this.products = this.products.map(res=>{
        const sizes = res.sizes.map((element:any)=>{
            return element.size
        })
        if(sizes.length > 0){
          res.end = sizes[sizes.length - 1];
          res.first = sizes[0];
        }
        return res;
      })
      console.log(this.products);

    }
  }

  getSalesProduct(){
    this.service.getSales().then((res)=>{
      if(res.data.error){

      }else{
        this.salesItem = res.data.data;
        console.log(this.salesItem);

      }
    })
  }

}
