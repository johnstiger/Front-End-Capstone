import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { Categories, Products, Sizes } from 'src/app/Customer/Common/model/customer-model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {

  product!: Products;
  unit_measure!: number;
  avail_unit_measure!: number;
  sizes!: any;
  image!: string;

  errors!: any;
  id: any;

  token= localStorage.getItem('customer_token');

  constructor(
    private router: Router,
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private location : Location
  ) { }




  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );
    this.getProduct();

  }

  return(){
    this.location.back();
  }

  async getProduct() {
    // this.service.loading();
    await this.service.getProduct(this.id).then((result) => {
      this.product = result.data.data;
      this.image =this.product.image;
      this.id = this.product.id;
      this.unit_measure = this.product.sizes[0].pivot.unit_measure;
      if (this.product.sizes.length > 0) {
        this.avail_unit_measure = this.product.sizes[0].pivot.avail_unit_measure;
        this.sizes = this.product.sizes[0].pivot.size;
      } else {
        this.avail_unit_measure = 0;
        this.sizes="";
        // this.unit_measure = 0;
      }
    })
    // this.service.closeLoading();
  }

  async submit(id:any, data:any) {
    if(this.token) {
      await this.service.addtoCart(id, data, this.token).then((result) => {
        if(result.data.error){
          this.errors = result.data.message;
        }else {
          this.router.navigate(["home"]);
        }
      })
    }else {
      this.router.navigate(["login"]);
    }
  }

  async checkOut(product:any){
    this.router.navigate(["/order-page"]);
  }
}
