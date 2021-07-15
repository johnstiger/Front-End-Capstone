import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Products } from 'src/app/Customer/Common/model/customer-model';
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
  searchResult! : Products[];

  constructor( private service : AdminService ) { }

  ngOnInit(): void {
  }

  async searchProducts(){
    const token = localStorage.getItem('admin_token');
    const result = await this.service.searchProducts(this.form.value, token);
    this.searchResult = result.data.data;
  }


  async getProducts(){
   const result = await this.service.products();
   this.products = result.data.data;
  }



}
