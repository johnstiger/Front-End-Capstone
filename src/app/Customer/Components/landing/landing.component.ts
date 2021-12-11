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
  storage : Array<any> = [];
  testing : Array<any> = [];

  constructor(
    private router: Router,
    private service: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getSalesProduct();
  }

  async getProducts() {
    this.service.showLoading();
    const result = await this.service.products(this.token);
    if(result.data.error){
    }else{
      this.products = result.data.message == "No data yet!" ? [] : result.data.data
      this.products.forEach((product: any) => {
        product.sizes = product.sizes.filter((size: any) => size.pivot.avail_unit_measure > 0)
      })
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
    }

    this.service.closeLoading();
  }

  select(product:any, category: string){
    this.service.showLoading();
    // this.router.navigate([`/selected/${category == 'onsale' ? product.products.id : product.id}`],{
    //   state: {
    //     data: product
    //   }
    // })
    this.router.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }

  getSalesProduct(){
    this.service.getSales().then((res)=>{
      if(res.data.error){
        console.log(res.data.message);
      }else{
        this.salesItem = res.data.message == "No data yet!" ? [] : res.data.data
        this.salesItem.forEach((product: any) => {
          product.sizes = product.sizes.filter((size: any) => size.pivot.avail_unit_measure > 0)
        })
        console.log(this.salesItem.map(res=>{
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
        }));

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
    this.service.showLoading();
    this.service.getCategories().then((res)=>{
      this.categories = res.data.data;
      let test = this.categories.map(res=>{
        if(res.name == name.target.id){
          return res.id;
        }
      })
      var categoryId = test.filter(res=>{
        return res;
      })[0];
      this.router.navigate(['/choose?=/'+categoryId])
    });

  }

}
