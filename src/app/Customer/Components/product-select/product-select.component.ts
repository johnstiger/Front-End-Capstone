import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import {
  Categories,
  Products,
  Sizes
} from 'src/app/Customer/Common/model/customer-model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {
  product!: any;
  unit_measure!: number;
  avail_unit_measure: number = 0;
  sizes!: any;
  selectedSize: string = 'Select';
  maxPerSize: number = 1;
  selectedSizeId!: number;
  comments : Array<any> = [];
  image!: string;

  errors!: any;
  id: any;

  token = localStorage.getItem('customer_token');

  constructor(
    private router: Router,
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private location : Location
  ) { }




  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getProduct();
  }

  return(){
    this.location.back();
  }

  getPrice(product: any) {
    if (product.sales_item.length > 0) {
      return product.sales_item[0].price
    } else {
      return product.price
    }
  }

  async getProduct() {
    this.service.loading();
    await this.service.getProduct(this.id).then(result => {
      this.product = result.data.data;
      this.comments = result.data.comments
      this.image = this.product.image;
      this.id = this.product.id;
      this.sizes = this.product.sizes;
      if (this.sizes.length == 1) {
        this.avail_unit_measure = this.sizes[0].pivot.unit_measure;
        this.selectedSizeId = this.sizes[0].id;
        this.maxPerSize = this.sizes[0].pivot.unit_measure;
      }
    });
    this.service.closeLoading();
  }

  selectSize(size: any) {
    this.selectedSize = size.size;
    this.selectedSizeId = size.id;
    this.maxPerSize = size.pivot.unit_measure;
    this.avail_unit_measure = size.pivot.unit_measure;
    this.unit_measure = 0
  }

  checkQuantity() {
    if (this.unit_measure > this.maxPerSize) {
      this.unit_measure = this.maxPerSize;
    } else if( this.unit_measure < 1) {
      this.unit_measure = 1
    }
  }

  async submit(id: any, data: any) {
    data.unit_measure = this.unit_measure;
    data.sizeId = this.selectedSizeId;
    if (this.token) {
      await this.service.addtoCart(id, data, this.token).then(result => {
        if (result.data.error) {
          this.errors = result.data.message;
        } else {
          this.service.ShowSuccessMessage(result.data.message);
          setTimeout(()=>{
            this.router.navigate(['home']);
          },2000)
        }
      });
    } else {
      const cart = {id: id, data: data}
      localStorage.setItem('addToCart', JSON.stringify(cart));
      this.router.navigate(['login']);
    }
  }

  async checkout(data: any) {
    const index = this.product.sizes.findIndex(
      (size: any) => size.id == this.selectedSizeId
    );
    this.product.sizes[index].pivot.quantity = this.unit_measure;
    this.product.pivot = this.product.sizes[index].pivot;
    this.product.pivot.total = this.product.price * this.unit_measure;
    await this.service.checkOut(data, this.token).then(result => {
      if (result.data.error) {
        this.errors = result.data.message;
      } else {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify([this.product]));
        this.router.navigate(['/order-page']);
      }
    }).catch(error => {
      if (!this.token) {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify([this.product]));
        this.router.navigate(['/login']);
      }
    });
  }
}
