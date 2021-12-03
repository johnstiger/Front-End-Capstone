import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  newPasswordForm = new FormGroup({
    current_password: new FormControl(''),
    password: new FormControl(''),
    password_confirmation : new FormControl(''),
  })

  editAccount = new FormGroup({
    image : new FormControl(''),
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    contact_number : new FormControl(''),
  })

  editNotResponsive = new FormGroup({
    image : new FormControl(''),
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    contact_number : new FormControl(''),
  })

  constructor(
    private location : Location,
    private service : CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomersDetails()
  }

  display = 'none';
  token = localStorage.getItem('customer_token');
  error : any;
  firstname : any;
  lastname : any;
  contact_number : any;
  image : any;
  address : any;
  email : any;

  resetPassword(){
    this.service.customerChangePassword(this.newPasswordForm.value, this.token).then((res)=>{
      console.log(res.data);

      if(res.data.error){
        this.error = res.data.message;
      }else{
        this.service.ShowSuccessMessage(res.data.message);
        this.onCloseHandled();
      }
    })
  }

  newInformation(){
    this.service.showLoading();
    this.service.editCustomerAccount(this.editNotResponsive.value, this.token).then((res)=>{
      console.log(this.editNotResponsive.value, res.data);
      if(res.data.error){
        this.error = res.data.message;
        this.service.closeLoading();
      }else{
        this.service.ShowSuccessMessage(res.data.message);
        setTimeout(()=>{
          this.location.back();
        },1500)
      }
    })
  }

  submit(){
    this.service.showLoading();
    this.service.editCustomerAccount(this.editAccount.value, this.token).then((res)=>{
      console.log(this.editAccount.value, res.data);
      if(res.data.error){
        this.error = res.data.message;
        this.service.closeLoading();
      }else{
        this.service.ShowSuccessMessage(res.data.message);
        setTimeout(()=>{
          this.location.back();
        },1500)
      }
    })

  }

  async getCustomersDetails() {
    this.service.showLoading();
    let customerId = localStorage.getItem('customer');
    await this.service.getCustomerProfile(customerId, this.token).then((result)=>{
      this.firstname = result.data.data.firstname
      this.lastname = result.data.data.lastname
      this.email = result.data.data.email
      this.image = result.data.data.image
      this.contact_number = result.data.data.contact_number
      this.service.closeLoading();
    });
  }

  return(){
    this.location.back();
  }

  openModal(){
    this.display='block';
 }

  onCloseHandled(){
    this.display='none';
  }

}
