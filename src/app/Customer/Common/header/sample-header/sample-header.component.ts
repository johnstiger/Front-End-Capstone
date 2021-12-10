import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { SearchService } from 'src/app/Common/search.service';
import { CustomerService } from 'src/app/Customer/Services/customer.service';
import { Customers } from '../../../../Admin/Common/model/admin-model';

@Component({
  selector: 'app-sample-header',
  templateUrl: './sample-header.component.html',
  styleUrls: ['./sample-header.component.css']
})
export class SampleHeaderComponent implements OnInit {

  form = new FormGroup({
    data : new FormControl('')
  })

  unAuthorized = true;
  authorized = false;
  categories : Array<any> = [];
  customers: Array<any> = [];
  change = false;
  productsInCart: any;

  data : string = "test";

  token = localStorage.getItem('customer_token')

  @Output() messageEvent  = new EventEmitter<string>();
  @Output() categoryEvent  = new EventEmitter<string>();

  constructor(private router: Router,
    private service : CustomerService,
    private _test : AdminService,
     private oberver : SearchService) { }

  ngOnInit(): void {
    this.getCategories();
    if (window.localStorage.getItem('customer_token')) {
      this.countProductsInCart();
      this.unAuthorized = false;
      this.authorized = true;
    }else {
      this.unAuthorized = true;
      this.authorized = false;
    }
  }

  searchProducts(){
    if(this.form.value.data == ''){
      console.log(this.service.ShowErrorMessage('Please enter valid value'));
    }else{
        this.service.showLoading()
        sessionStorage.setItem('data', this.form.value.data);
        this.router.navigate(['/search-result']);
        this.oberver.sendTriggeredEvent(this.form.value);
      }
  }

  countProductsInCart(){
    this.service.countProductsInCart(this.token).then((res)=>{
      if(res.data > 0){
        $('.custom-badge').css('display','block');
        $('.custom-badge').html(res.data);
      }
    })
  }

  openNav() {
    $('#mySidenav').css({
      'width':'100%',
      'overflow' : 'hidden',
      'height': '100%'
    });
  }
  closeNav() {
    $('#mySidenav').css('width','0');
  }

  LinkThisCategory(category : any){
    this.closeNav();
    this.categoryEvent.emit(category.id);
    this.router.navigate(['/choose?=/'+category.id],{
      state: {
        data: category
      }
    })
  }

  // async logout(){
  //   this.service.loading()
  //   const result = await this._test.logoutUser(this.token);
  //   localStorage.clear();
  //   window.location.reload();
  // }

  async logout(){
    this.service.loading();
    const result = await this.service.logoutUser(this.token);
    if(result.data.error){
    }else{
      localStorage.clear();
      window.location.reload();
    }
  }

  async getCategories(){
    const result = await this.service.getCategories();
    if(result.data.error){

    }else{
      this.categories = result.data.data;
    }
  }

}
