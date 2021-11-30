import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
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
    ])
  });


  error : any;
  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit(): void {
  }
  register() {  
    this.service.register(this.registerForm.value).then((res) => {
      if(res.data.error){
        this.error = res.data.message;
      }else {
        console.log(res.data)
        window.localStorage.setItem('customer_token',"Bearer "+ res.data.access_token);
        window.localStorage.setItem('customer_id',res.data.customer_id);
        this.router.navigate(['/home']);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
