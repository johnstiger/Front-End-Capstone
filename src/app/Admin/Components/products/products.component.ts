import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { AdminService } from '../../Services/admin.service';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });
  token = localStorage.getItem('admin_token');

  success! : any;
  error! : any;

  products! : Products[];

  constructor( private service : AdminService, private router : Router ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async searchProducts(){
    const result = await this.service.searchProducts(this.form.value, this.token);
    this.products = result.data.data;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/admin/products']);
  }


  async getProducts(){
   const result = await this.service.products(this.token);
   this.products = result.data.data;
   console.log(this.products);
  }

  async deleteProduct(id:any){
    const result = await this.service.deleteProduct(this.token, id);
    if(result.data.error){
      this.error = result.data.message;
    }else{
      this.success = result.data.message;
    }
  }

  update(product:any){
    this.router.navigate(['/admin/edit-product/'+product.id],{
      state: {
        data: product
      }
    })
  }


  async confirmDelete(id:any){
    Swal.fire({
      title: 'Are you sure you want to delete this one?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.value){
        this.deleteProduct(id);
        Swal.fire(
          'Removed',
          'Product is Successfully Deleted!',
          'success'
        ).then(() => {
          this.ngOnInit();
        })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          ' still in our database.)',
          'error'
        )
      }
    })
  }

}
