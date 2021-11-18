import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { Categories, Products, Sizes } from 'src/app/Customer/Common/model/customer-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {

  product!: Products;
  unit_measure!: number;
  sizes!: any;
  image!: string;

  errors!: any;

  token= localStorage.getItem('customer_token');

  constructor(
    private router: Router, 
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  id: any;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );
    this.getProduct();
  }

  async getProduct() {
    // this.service.loading();
    await this.service.getProduct(this.id).then((result) => {
      this.product = result.data.data;
      this.image =this.product.image;
      this.id = this.product.id;
      if (this.product.sizes.length > 0) {
        this.sizes = this.product.sizes[0].pivot.size;
        this.unit_measure = this.product.sizes[0].pivot.unit_measure;
      } else {
        this.sizes="";
        this.unit_measure = 0;
      }
    })
  }

  async submit(id:any, data:any) {
    if(this.token) {
      await this.service.addtoCart(id, data, this.token).then((result) => {
        if(result.data.error){
          this.errors = result.data.message;
        }else {
          this.router.navigate(["home"]);
        }
        console.log(id, data)
      })
    }else {
      this.router.navigate(["login"]);
    }
  }

  async checkOut(product:any){
    this.router.navigate(["check-out"])
  }
}
