import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Customer/Services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(
    private router: Router,
    private service: CustomerService,
  ) { }

  token = localStorage.getItem('customer_token');
  products: Array<any> = []
  total: number = 0;
  errors!: any;
  success!: any;
  product: any;

  Products = new Array();

  ngOnInit(): void {
    this.getProduct()
  }



  async getProduct() {
    await this.service.getProducts(this.token).then(result => {
      if (!result.data.error) {
        // console.log(result.data);
        this.products = result.data.data
        this.products.map(res => {
          this.total += res.pivot.total;
          return res;
        })
        this.total = Math.ceil(this.total);
      }
    })
  }

  async checkout(data: any) {
    console.log("Checkout")
    await this.service.checkOut(data, this.token).then(result => {
      if (result.data.error) {
        this.errors = result.data.message;
      } else {
        this.router.navigate(["/order-page"]);
      }
      // console.log(result.data.data);
    })
  }

  async confirmRemove(product: any) {
    console.log(product.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to REMOVE " + product.name + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteProduct(product.id, this.token).then(() => {
          console.log(product.id)
          // this.ngOnInit();
        });
        this.service.ShowSuccessMessage("Successfully Removed Product!");
        this.getProduct()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          product.name + ' is still in our database.',
          'error'
        )
      }
    })
  }

  changeQuantity(product: any) {
    console.log(product)
  }

  selectById(product: any, products: Array<any>) {
    let selectall = document.getElementById('selectAll') as HTMLInputElement;
    let test = document.getElementsByClassName('selectId') as HTMLCollectionOf<HTMLInputElement>
    let hasUnchecked: Array<boolean> = []
    products.forEach((element, index) => {
      if (!test[index].checked) {
        hasUnchecked.push(true)
      }
    })
    this.selected(product)
    if (hasUnchecked.length) {
      selectall.checked = false
    } else {
      selectall.checked = true
    }
  }

  selected(product: any) {
    if (this.Products.includes(product)) {
      this.Products.slice(this.Products.indexOf(product), 1);
    } else {
      this.Products.push(product);
    }
  }

  selectAll(products: Array<any> = []) {
    let selectall = document.getElementById('selectAll') as HTMLInputElement;
    products.forEach((element, index) => {
      let test = document.getElementsByClassName('selectId')[index] as HTMLInputElement
      if (selectall.checked) {
        this.selected(element);
        test.checked = true;
      } else {
        this.Products = [];
        test.checked = false;
      }
    })
  }
}
