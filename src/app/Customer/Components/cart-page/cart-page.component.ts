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
    this.service.showLoading();
    await this.service.getProducts(this.token).then(result => {
      console.log(result.data);

      if (!result.data.error) {
        if (result.data.data == undefined) {
          this.products = [];
        } else {
          this.products = result.data.data;
          var total = 0;
          var overallTotal = this.products.map(res => {
            return parseInt(res.pivot.total);
          });
          this.total = overallTotal.reduce(
            (total: any, num: any) => total + num
          );
        }
        this.service.closeLoading();
        this.total = Math.ceil(this.total);
      }
    });
  }

  validateQuantity(currentQuantity: any, product: any) {
    const test =
      currentQuantity > product.sizes[0].pivot.avail_unit_measure
        ? product.sizes[0].pivot.avail_unit_measure
        : currentQuantity > 0
        ? currentQuantity
        : 1;
    console.log(currentQuantity, product.sizes[0] );
    return test;
  }

  productSize(sizes: [any], sizeId: number) {
    const size = sizes.find(size => size.id === sizeId);
    return size.size;
  }

  async update(quantity: any, product: any) {
    product.pivot.quantity = parseInt(quantity);
    this.service
      .updateCartProduct(product.id, product, this.token)
      .then(result => {
        if (result.data.error) {
          this.errors = result.data.message;
        } else {
          this.service.ShowSuccessMessage(result.data.message);
          this.ngOnInit();
        }
      });
  }

  async checkout(data: any) {
    await this.service.checkOut(data, this.token).then(result => {
      if (result.data.error) {
        this.errors = result.data.message;
      } else {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(this.Products));
        this.service.orderProducts = this.Products;
        console.log(this.Products);

        this.router.navigate(['/order-page']);
      }
      // console.log(result.data.data);
    });
  }

  async confirmRemove(product: any) {
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
          setTimeout(()=>{
            this.ngOnInit();
          },1500)
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          product.name + ' is still in our database.',
          'error'
        );
      }
    });
  }

  selectById(product: any, products: Array<any>, device: string) {
    let selectall = document.getElementById(
      device == 'mobile' ? 'selectAllMobile' : 'selectAllDesktop'
    ) as HTMLInputElement;
    let test = document.getElementsByClassName(
      device == 'mobile' ? 'selectIdMobile' : 'selectIdDesktop'
    ) as HTMLCollectionOf<HTMLInputElement>;
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

  selectAll(products: Array<any> = [], device: string) {
    let selectall = document.getElementById(
      device == 'mobile' ? 'selectAllMobile' : 'selectAllDesktop'
    ) as HTMLInputElement;
    this.Products = [];
    products.forEach((element, index) => {
      let test = document.getElementsByClassName(
        device == 'mobile' ? 'selectIdMobile' : 'selectIdDesktop'
      )[index] as HTMLInputElement;
      if (selectall.checked) {
        this.Products.push(element);
        console.log(this.Products);
        test.checked = true;
      } else {
        test.checked = false;
      }
    });
  }
}
