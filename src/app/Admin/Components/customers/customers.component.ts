import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customers } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });
  constructor(private http : AdminService) { }

  customers! : Customers[];

  ngOnInit(): void {
    this.getCustomers();
  }

  message : any;
  token = localStorage.getItem('admin_token');

  async getCustomers(){
    const result = await this.http.getCustomers(this.token);
    if(result.data.message == "Success"){
      this.customers = result.data.data;
    }else{
     this.message = result.data.message;
    }
  }

 async searchCustomers()
  {
    const result = await this.http.searchCustomers(this.form.value, this.token);
    if(result.data.found){
      this.customers = result.data.data;
      console.log(this.customers);
    }else{
      this.http.ShowErrorMessage(result.data.message);
    }

  }
}
