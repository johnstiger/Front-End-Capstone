import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public passwordType: string = 'password';
  public Password: boolean = false;
  public passwordHidden: boolean = false;

  public confirmationType: string = 'password';
  public confirmationPassword: boolean = false;
  public confirmationPasswordHidden: boolean = false;
  registerForm: FormGroup;

  error : any;
  constructor(private router: Router, private service: CustomerService, public formBuilder: FormBuilder) {
    this.registerForm = new FormGroup({
      lastname: new FormControl('', [
        Validators.required
      ]),
      firstname: new FormControl('', [
        Validators.required
      ]),
      contact_number: new FormControl('', [
        Validators.required,
        Validators.minLength(11)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
   }

  ngOnInit(): void {
  }
  password(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const password_confirmation = formGroup.get('password_confirmation');
    return password === password_confirmation ? null : {password_comfirmationNotMatch: true};
  }
  showPassword() {
    if(this.Password){
      this.Password = false;
      this.passwordType = 'password';
      this.passwordHidden = !this.passwordHidden;
    }else{
      this.Password = true;
      this.passwordType = 'text';
      this.passwordHidden = !this.passwordHidden;
    }
  }
  showConfirmationPassword(){
    if (this.confirmationPassword){
      this.confirmationPassword = false;
      this.confirmationType = 'password';
      this.confirmationPasswordHidden = !this.confirmationPasswordHidden
    }else{
      this.confirmationPassword = true;
      this.confirmationType = 'text';
      this.confirmationPasswordHidden = !this.confirmationPasswordHidden
    }
  }
  register() {
    this.service.showLoading();
    this.service.register(this.registerForm.value).then((res) => {
      if(res.data.error){
        this.error = res.data.message;
        this.service.closeLoading();
      }else {
        // console.log(res.data)
        // window.localStorage.setItem('customer_token',"Bearer "+ res.data.access_token);
        // window.localStorage.setItem('customer_id',res.data.customer_id);
        this.service.showMessage(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
