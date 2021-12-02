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

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {
  product!: Products;
  unit_measure!: number;
  avail_unit_measure: number = 0;
  sizes!: any;
  selectedSize: string = 'Select';
  maxPerSize: number = 1;
  selectedSizeId!: number;
  image!: string;

  errors!: any;
  id: any;

  token = localStorage.getItem('customer_token');

  constructor(
    private router: Router,
    private service: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getProduct();
  }

  async getProduct() {
    // this.service.loading();
    await this.service.getProduct(this.id).then(result => {
      this.product = result.data.data;
      this.image = this.product.image;
      this.id = this.product.id;
      console.log('Selected product', this.product);
      this.sizes = this.product.sizes;
      if (this.sizes.length == 1) {
        this.avail_unit_measure = this.sizes[0].pivot.unit_measure
        console.log(this.sizes[0].unit_measure)
      }
    });
    // this.service.closeLoading();
  }

  selectSize(size: any) {
    this.selectedSize = size.size;
    this.selectedSizeId = size.id;
    this.maxPerSize = size.pivot.unit_measure;
    this.avail_unit_measure = size.pivot.unit_measure;
  }

  checkQuantity() {
    if (this.unit_measure > this.maxPerSize) {
      this.unit_measure = this.maxPerSize;
    }
  }

  async submit(id: any, data: any) {
    data.unit_measure = this.unit_measure;
    data.sizeId = this.selectedSizeId;
    console.log('submit', data);
    if (this.token) {
      await this.service.addtoCart(id, data, this.token).then(result => {
        if (result.data.error) {
          this.errors = result.data.message;
        } else {
          this.router.navigate(['home']);
          console.log(result.data);
        }
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  async checkOut(product: any) {
    this.router.navigate(['/order-page']);
  }
}
