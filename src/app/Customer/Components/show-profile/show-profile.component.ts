import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/Admin/Common/model/admin-model';
import { CustomerService } from 'src/app/Customer/Services/customer.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  showProfile: Customers[] = [];

  token = localStorage.getItem('customer_token');

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    // console.log('jj', this.getCustomersDetails(this.showProfile))
    // this.getCustomersDetails(customer: Customer)
  }

  async getCustomersDetails(customer: Customers) {
    console.log(customer)
    await this.customerService.getCustomerProfile(customer.id, this.token).then((result)=>{
      console.log('id', customer.id);
      this.showProfile = result.data.data;
      console.log('logggg', this.showProfile)
    });
  }

}
