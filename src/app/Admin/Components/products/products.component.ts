import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { AdminService } from '../../Services/admin.service';
import Swal from 'sweetalert2';
import { UrlService } from 'src/app/Url/url.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

// Kulang kay ang pag add sa on sale product
// Gikan sa kani nga component
// Hint kay gamiton ang id sa product

export class ProductsComponent implements OnInit {
  form = new FormGroup({
    data: new FormControl('', [
      Validators.required
    ])
  });

  success!: any;
  error!: any;
  page: Number = 1;
  display = 'none';
  products!: Products[];
  productName: any;

  constructor(
    private service: AdminService,
    private router: Router,
    private link: UrlService,
  ) { }

  token = localStorage.getItem('admin_token');
  sizeId = new Array();
  cp: number = 1;
  stockSizes: Array<any> = [];
  product: any;

  ngOnInit(): void {
    this.getProducts();
  }

  searchProducts() {
    this.service.searchProducts(this.form.value, this.token).then((result) => {
      if (result.data.found) {
        this.products = result.data.data;
      } else {
        this.service.ShowErrorMessage(result.data.message);
      }
    });
  }

  async getProducts() {
    this.service.loading();
    const result = await this.service.products(this.token).then((res) => {
      if (res.data.error) {
        this.service.ShowErrorMessage(res.data.message);
      } else {
        this.products = res.data.data;
        this.products = this.products.map(res => {
          const size = res.sizes.map((size: any, ndx: any) => {
            return size.pivot.avail_unit_measure
          })
          let total_avail_unit_measure = 0
          if (size.length) {
            total_avail_unit_measure = size.reduce((total: any, num: any) => total + num)
          }
          res['total_avail_unit_measure'] = total_avail_unit_measure
          return res
        })
      }
      this.service.closeLoading();
    });

  }


  async deleteProduct(id: any) {
    const result = await this.service.deleteProduct(id, this.token).then((result) => {
      if (result.data.error) {
        this.error = result.data.message;
      } else {
        this.success = result.data.message;
      }
    });
  }

  update(product: any) {
    this.router.navigate(['/admin/edit-product/' + product.id], {
      state: {
        data: product
      }
    })
  }

  async confirmDelete(product: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to DELETE " + product.name + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteProduct(product.id).then(() => {
          this.ngOnInit();
        });
        this.service.ShowSuccessMessage("SuccessFully Deleted Product!");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          product.name + ' is still in our database.',
          'error'
        )
      }
    })
  }


  selected(size: any) {
    let select = document.getElementById('' + size.id + '') as HTMLInputElement
    if (this.sizeId.includes(size)) {
      this.sizeId.slice(this.sizeId.indexOf(size), 1);
      select.disabled = true;
    } else {
      this.sizeId.push(size);
      select.disabled = false;
    }
  }

  selectAll(sizes: Array<any> = []) {
    let selectall = document.getElementById('selectAll') as HTMLInputElement;
    sizes.forEach((element, index) => {
      let test = document.getElementsByClassName('selectId')[index] as HTMLInputElement
      let select = document.getElementById('' + element.id + '') as HTMLInputElement
      if (selectall.checked) {
        this.selected(element);
        test.checked = true;
      } else {
        this.sizeId = [];
        test.checked = false;
        select.disabled = true;
      }
    });
  }

  
  // Pop Up Modal
  openModal(product : any){
    this.productName = product.name;
    this.stockSizes = product.sizes
    let check = this.stockSizes.map(res => {
      if(res.size === 'N/A'){
        return true;
      }
      return false;
    })
    this.product = product;
    if(check[0]){
      this.sizeId = product.sizes
      this.addToSale(product);
    }else{
      this.display = 'block';
    }
  }

  // Submit Modal To Sales Page
  addToSale(product : any){
    this.sizeId.forEach(element=>{
      let select = document.getElementById(''+element.id+'') as HTMLInputElement
      element.pivot.sales_item = parseInt(select.value) > element.pivot.avail_unit_measure ? element.pivot.avail_unit_measure : parseInt(select.value)
      element.pivot.avail_unit_measure = element.pivot.avail_unit_measure - parseInt(select.value);
    })
    if(this.sizeId.length > 0){
      this.router.navigate(['/admin/add-sales/'+product.id],{
          state: {
            data: product,
            productSize : this.sizeId
          }
      })
    }else{
      this.service.ShowErrorMessage('Please Select Product Sizes');
    }
  }

  // Close Pop Up Modal
  onCloseHandled(){
    this.display = 'none'
    window.location.reload()
  }
}
