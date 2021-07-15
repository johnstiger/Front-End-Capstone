import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

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

  products! : Products[];

  constructor( private service : AdminService, private router : Router ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getDashboard(){
    const result = await this.service.dashboard();
    console.log(result.data);
  }

  async getProducts(){
   const result = await this.service.products();
   this.products = result.data.data;
  }


  // Search
  async searchProducts(){
    const result = await this.service.searchProducts(this.form.value);
    this.products = result.data.data;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/admin/products']);
  }

}
