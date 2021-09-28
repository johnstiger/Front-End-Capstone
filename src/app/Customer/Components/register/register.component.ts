import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  axios from 'axios';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
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

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit(): void {
  }
  register() {
    axios.post("http://127.0.0.1:8000/api/register", this.form.value).then(res => {
      console.log(res.data)
<<<<<<< HEAD
      window.localStorage.setItem('customer_token',res.data.access_token);
      window.localStorage.setItem('customer_id',res.data.customer_id);
      return this.router.navigate(['/landing']);
=======
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
    })
    .catch(err => {
      console.log(err);
    })
  }
}
