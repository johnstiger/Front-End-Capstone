import { Payment, ProductRequestDto, OrderRequest } from './../../Common/model/customer-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Customer/Services/customer.service';
import {
  Categories,
  Products,
  Sizes
} from 'src/app/Customer/Common/model/customer-model';
import { Location } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-order-page',
  templateUrl: './my-order-page.component.html',
  styleUrls: ['./my-order-page.component.css']
})
export class MyOrderPageComponent implements OnInit {
  constructor(private router: Router,
    private service: CustomerService,
    private location: Location,
    private orderService: OrderService,
  ) { }
  user:any = null
  token = localStorage.getItem('customer_token');
  products: Array<any> = [];
  totalAmount: number = 0;
  payments:Payment[] = [
    {
      value: 'gcash',
      display: 'GCash'
    },
    {
      value: 'palawan',
      display: 'Palawan'
    }
  ]

  address_id = null
  paymentMethod = 'gcash'
  order: OrderRequest = {
    data: [],
    payment_method: 'gcash',
    address_id: 0
  }

  ngOnInit(): void {
    this.service.showLoading();
    this.products = JSON.parse(localStorage.getItem('products') || '')
    if(this.products[0].length == undefined){
      this.products.forEach(product => {
        this.totalAmount += product.pivot.total
        product.sizes.forEach((size:any)=>{
          if(size.id == product.pivot.sizeId){
            product["selected_size"] = size.size
          }
        })
        console.log("Loaded!");
        this.order.data.push(this.tranformToProductDto(product))
      });
    }else{
      this.products = [];
    }
    this.orderService.getUserInfo().subscribe(response => {
      this.user = response.data
      this.service.closeLoading();
    })
  }

  goToManageAddress(){
    sessionStorage.setItem('from_place_order','1');
    this.router.navigate(['/addresses']);
  }

  // remove(product:any){
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You want to REMOVE ' + product.name + '?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, remove it!'
  //   }).then(result => {
  //     if (result.value) {
  //       this.products.forEach((res, index)=>{
  //         if(res.id == product.id){
  //           console.log(index);
  //           this.products.splice(index, 1);
  //         }
  //       })
  //       this.totalAmount -= product.pivot.total
  //       this.order.data.push(this.tranformToProductDto(product))
  //       localStorage.setItem('products',JSON.stringify([this.products]))
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         product.name + ' is still in our database.',
  //         'error'
  //       );
  //     }
  //   });

  // }

  async showProducts() {
    await this.service.showProducts(this.token).then(result => {
      if (!result.data.error) {
        this.products = result.data.data;
      }
    });
  }

  cancel() {
    this.location.back();
  }

  placeOrder() {
    console.log(this.order);

    this.orderService.create(this.order).subscribe(data => {
      this.router.navigateByUrl('/pay')
    })
  }

  tranformToProductDto(product: any): ProductRequestDto {
    return {
      product_id: product.id,
      quantity: product.pivot.quantity,
      subtotal: product.pivot.total,
      size_id: product.pivot.sizeId
    }
  }
}
