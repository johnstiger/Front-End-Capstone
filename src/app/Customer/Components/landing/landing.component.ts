import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import axios from 'axios';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { CustomerService } from '../../Services/customer.service';
import Swal from 'sweetalert2';

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
    private service: CustomerService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(){
    Swal.fire({
      title:'Finding Data Please Wait.'
    });
    Swal.showLoading();
    const result = await this.service.products(this.token).then((res)=>{
    this.products = res.data.data;
    console.log(this.products)
    Swal.close();
   });
  }

  select(product:any){
    this.router.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }




  


}
