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

  change = false;

  data : string = "test";

  @Output() messageEvent  = new EventEmitter<string>();

  constructor(private router: Router, private service : CustomerService) { }

  ngOnInit(): void {
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

}
