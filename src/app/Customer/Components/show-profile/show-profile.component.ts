import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/Admin/Common/model/admin-model';
import { CustomerService } from 'src/app/Customer/Services/customer.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  firstname : any;
  lastname : any;
  email : any;
  contact_number : any;
  image : any;
  address : any;
  details : any;

  token = localStorage.getItem('customer_token');

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomersDetails();
  }

  async getCustomersDetails() {
    let customerId = localStorage.getItem('customer');
    await this.customerService.getCustomerProfile(customerId, this.token).then((result)=>{
      this.details = result.data.data
      this.firstname = this.details.firstname
      this.lastname = this.details.lastname
      this.email = this.details.email
      this.image = this.details.image
      this.contact_number = this.details.contact_number
      this.address = result.data.address ? result.data.address.municipality+", "+result.data.address.province : [];
    });
  }

}
