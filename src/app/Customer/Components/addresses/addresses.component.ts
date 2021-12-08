import { AddressService } from './../../Services/address.service';
import { Component, OnInit } from '@angular/core';
import { Address } from '../../Common/model/customer-model';
import { Location } from '@angular/common';
import { CustomerService } from '../../Services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  public addresses: Address[] = []
  private readonly customerId: string = localStorage.getItem('customer') || '';
  private readonly token: string = localStorage.getItem('customer_token') || '';
  lastname : any;
  firstname : any;

  constructor(private service: AddressService, private http : CustomerService ,private location : Location, private router:Router) { }

  ngOnInit(): void {
    this.http.showLoading();
    this.service.getAddresses().subscribe(response => {
      this.addresses = response.data
    })
    this.http.getCustomerProfile(this.customerId,this.token).then((res)=>{
      this.firstname = res.data.data.firstname;
      this.lastname = res.data.data.lastname;
      this.http.closeLoading();
    })
  }

  return(){
    if(sessionStorage.getItem('from_place_order')){
      this.router.navigate(['/order-page'])
      sessionStorage.removeItem('from_place_order');
    }else{
      this.location.back();
    }
  }

}
