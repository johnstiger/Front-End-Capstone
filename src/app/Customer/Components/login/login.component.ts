import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  axios from 'axios';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit(): void {
  }

  error: any;

  async login() {
      axios.post("http://127.0.0.1:8000/api/login", this.form.value).then(res => {
        console.log("I am here");
        console.log(res.data)
        window.localStorage.setItem('customer_token',res.data.access_token);
        window.localStorage.setItem('customer_id',res.data.customer_id);
        // document.getElementById('spinner').style.display = "block";
        return this.router.navigate(['/customer/landing']);
      }).catch(err => {
        console.log(err)
        // Swal.fire('Oppss','Error Login, Please Log In Again','warning');
        // document.getElementById('spinner').style.display ="none";
      })   
  
  }

}
