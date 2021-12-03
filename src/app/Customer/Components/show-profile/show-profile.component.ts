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
      this.firstname = result.data.data.firstname
      this.lastname = result.data.data.lastname
      this.email = result.data.data.email
      this.image = result.data.data.image
      this.contact_number = result.data.data.contact_number
    });
  }

}
