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
  constructor(private router: Router, private service: CustomerService) {}

  token = localStorage.getItem('customer_token');
  products: Array<any> = [];
  total: number = 0;
  errors!: any;
  success!: any;
  product: any;
  quantity!: number;

  Products = new Array();

  ngOnInit(): void {
    this.getProduct();
  }

  async getProduct() {
    await this.service.getProducts(this.token).then(result => {
      if (!result.data.error) {
        console.log(result.data);
        this.products = result.data.data;
        console.log(this.products);
        // this.productSize(this.products[0].sizes, this.products[0].pivot.sizeId)
        this.products.map(res => {
          this.total += res.pivot.total;
          return res;
        });
        this.total = Math.ceil(this.total);
      }
    });
  }

  productSize(sizes: [any], sizeId: number) {
    const size = sizes.find(size => size.id === sizeId);
    console.log('size', size.size)
    return size.size;
  }

  async checkout(data: any) {
    console.log('Checkout');
    await this.service.checkOut(data, this.token).then(result => {
      if (result.data.error) {
        this.errors = result.data.message;
      } else {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(this.Products));
        this.service.orderProducts = this.Products;
        console.log(this.service.orderProducts);

        this.router.navigate(['/order-page']);
      }
      // console.log(result.data.data);
    });
  }

  async confirmRemove(product: any) {
    console.log(product.id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to REMOVE ' + product.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then(result => {
      if (result.value) {
        this.service.deleteProduct(product.id, this.token).then(() => {
          this.service.ShowSuccessMessage('Successfully Removed Product!');
        });
        this.getProduct();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          product.name + ' is still in our database.',
          'error'
        );
      }
    });
  }

  changeQuantity(product: any) {
    console.log(product);
  }

  selectById(product: any, products: Array<any>) {
    let selectall = document.getElementById('selectAll') as HTMLInputElement;
    let test = document.getElementsByClassName('selectId') as HTMLCollectionOf<
      HTMLInputElement
    >;
    let hasUnchecked: Array<boolean> = [];
    products.forEach((element, index) => {
      if (!test[index].checked) {
        hasUnchecked.push(true);
      }
    });
    this.selected(product);
    console.log(this.Products);
    if (hasUnchecked.length) {
      selectall.checked = false;
    } else {
      selectall.checked = true;
    }
  }

  selected(newproduct: any) {
    if (this.Products.some(product => product.id === newproduct.id)) {
      this.Products.splice(this.Products.indexOf(newproduct), 1);
    } else {
      this.Products.push(newproduct);
    }
  }

  selectAll(products: Array<any> = []) {
    let selectall = document.getElementById('selectAll') as HTMLInputElement;
    this.Products = [];
    products.forEach((element, index) => {
      let test = document.getElementsByClassName('selectId')[
        index
      ] as HTMLInputElement;
      if (selectall.checked) {
        this.Products.push(element);
        test.checked = true;
      } else {
        test.checked = false;
      }
    });
  }
}
