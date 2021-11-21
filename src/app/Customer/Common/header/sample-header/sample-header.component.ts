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

  change = false;

  data : string = "test";

  token = localStorage.getItem('customer_token')

  @Output() messageEvent  = new EventEmitter<string>();

  constructor(private router: Router, private service : CustomerService) { }

  ngOnInit(): void {
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

  category(){
    this.change = !this.change;
    const value = $("#dropdown");
    this.change == true ? value.css('display','block') : value.css('display','none');
  }

  async logout(){
    this.service.loading();
    const result = await this.service.logoutUser(this.token);
    localStorage.clear();
    window.location.reload();
  }
}
