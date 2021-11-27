import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CustomerService } from 'src/app/Customer/Services/customer.service';

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
  change = false;

  data : string = "test";

  token = localStorage.getItem('customer_token')

  @Output() messageEvent  = new EventEmitter<string>();

  constructor(private router: Router, private service : CustomerService) { }

  ngOnInit(): void {
    this.getCategories();
    if (window.localStorage.getItem('customer_token')) {
      this.unAuthorized = false;
      this.authorized = true;
    }else {
      this.unAuthorized = true;
      this.authorized = false;
    }
  }

  searchProducts(){
    this.service.searchProducts(this.form.value).then((result)=>{
      this.messageEvent.emit(result.data);
    })
  }


  openNav() {
    $('#mySidenav').css('width','100%');
  }
  closeNav() {
    $('#mySidenav').css('width','0');
  }

  LinkThisCategory(category : any){
    this.router.navigate(['/choose?=/'+category.id],{
      state: {
        data: category
      }
    })
  }

  async logout(){
    this.service.loading();
    const result = await this.service.logoutUser(this.token);
    localStorage.clear();
    window.location.reload();
  }

  async getCategories(){
    const result = await this.service.getCategories();
    if(result.data.error){

    }else{
      this.categories = result.data.data;
      console.log(this.categories);

    }
  }

}
