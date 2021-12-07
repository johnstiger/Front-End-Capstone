import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/Common/search.service';
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

  message : any;
  search = "";
  cp : number = 0;
  products : any;
  display : boolean = false;
  path = 'http://santafe-dagom.herokuapp.com/img/';

  eventSubscription! : Subscription

  constructor(private service : CustomerService, private router : Router, private observer : SearchService)
  {
    this.eventSubscription = this.observer.getTriggeredEvent().subscribe((res)=>{
      this.searchProducts(res)
    })
  }

  result : any;

  ngOnInit(): void {
    if(sessionStorage.getItem('data')){
      let test = { data: sessionStorage.getItem('data') }
      this.searchProducts(test);
    }
  }

  test(){
    this.eventSubscription = this.observer.getTriggeredEvent().subscribe((res)=>{
      if(sessionStorage.getItem('data')){
        let test = { data: sessionStorage.getItem('data') }
        this.searchProducts(test);
      }
    })
  }

  searchProducts(text:any){
    this.service.showLoading()
    this.service.searchProducts(text).then((result)=>{
      console.log(result.data.found);
      this.message = result.data.message;
      this.products = result.data.found ? result.data.data : [];
      if(this.products.length == 0){
        this.display = true;
      }
      this.service.closeLoading();
    })

  }

  select(product:any){
    this.router.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }


}
