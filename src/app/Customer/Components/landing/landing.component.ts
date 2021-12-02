import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import axios from 'axios';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { CustomerService } from '../../Services/customer.service';
import Swal from 'sweetalert2';
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
  categories : Array<any> = [];
  maxSaleDisplay : number = 3;
  maxProductDisplay : number = 8;
  displayViewAllSales : boolean = false;
  displayViewAllProduct : boolean = false;

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
      if(this.products.length > this.maxProductDisplay){
        this.displayViewAllProduct = true;
      }
      this.products = this.products.map(res=>{
        const sizes = res.sizes.map((element:any)=>{
            return element.size
        })
        if(sizes.length > 1){
          res.availableSize = sizes[0]+'-'+sizes[sizes.length - 1];
        }else if(sizes.length == 1){
          res.availableSize = sizes[0];
        }else{
          res.availableSize = [];
        }
        return res;
      })
      console.log(this.products);

    }
  }

  select(product:any){
    this.router.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }

  getSalesProduct(){
    this.service.getSales().then((res)=>{
      if(res.data.error){

      }else{
        this.salesItem = res.data.data;
        if(this.salesItem.length > this.maxSaleDisplay){
          this.displayViewAllSales = true;
        }

      }
    })
  }

  viewAll(param:any){
    this.router.navigate(['/view=?/'+param])
  }

  selectCategory(name:any){
    this.service.getCategories().then((res)=>{
      this.categories = res.data.data;
      let test = this.categories.map(res=>{
        if(res.name == name.target.id){
          return res.id;
        }
      })
      var ambotLang = test.filter(res=>{
        return res;
      })[0];
      console.log(ambotLang);
      this.router.navigate(['/choose?=/'+ambotLang])

    });

  }

}
