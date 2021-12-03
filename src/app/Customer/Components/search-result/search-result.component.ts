import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Injectable ( )

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  form = new FormGroup({
    data : new FormControl('')
  })

  message = "";
  search = "";
  cp : number = 0;
  products : any;
  path = 'http://santafe-dagom.herokuapp.com/img/';




  constructor(private service : CustomerService, private router : Router) { }

  result : any;

  ngOnInit(): void {
  }

  recieveMessage($event:any){
    this.message = $event.message
    this.products = $event.data;
    console.log($event);

  }


  select(product:any){
    this.router.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }


}
