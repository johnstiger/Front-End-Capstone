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
<<<<<<< HEAD
      axios.post("http://127.0.0.1:8000/api/login", this.form.value).then(res => {
        console.log("I am here");
        console.log(res.data)
        window.localStorage.setItem('customer_token',res.data.access_token);
        window.localStorage.setItem('customer_id',res.data.customer_id);
        // document.getElementById('spinner').style.display = "block";
        return this.router.navigate(['/customer/landing']);
=======
    // const result = await this.service.login(this.form.value);
      // document.getElementById('spinner').style.display = "block";
      axios.post("http://127.0.0.1:8000/api/login", this.form.value).then(res => {
        console.log("I am here");
        console.log(res.data)
        // window.localStorage.setItem('customer_token',res.data.access_token);
        // window.localStorage.setItem('customer_id',res.data.client_id);
        // document.getElementById('spinner').style.display = "block";
        // return this.router.navigate(['/landing']);
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
      }).catch(err => {
        console.log(err)
        // Swal.fire('Oppss','Error Login, Please Log In Again','warning');
        // document.getElementById('spinner').style.display ="none";
      })   
<<<<<<< HEAD
  
=======
    // console.log(result)
    // if (result.data.error) {
    //   console.log("error siya choi")
    //   this.error = result.data.message;
    //   this.router.navigate(['/login']);
    // }else if (result.data.data.is_customer) {
    //   window.localStorage.setcItem('ustomer_token', "Bearer " + result.data.access_token);
    //   this.router.navigate(['/customer/landing']);
    // } else {
    //   window.localStorage.setItem('customer_token', "Bearer " + result.data.access_token);
    //   this.router.navigate(['/landing']);
    //  }

    // if (result.data) {
    //   console.log(result.data)
    //   window.localStorage.setItem('customer_token', "Bearer " + result.data.access_token);
    //   console.log('naa ko dre choi');
    //   this.router.navigate(['/customer/landing']);
    // } else if (result.data.error) {
    //   console.log("error siya choi")
    //   this.error = result.data.message;
    //   this.router.navigate(['/login']);
    // }
>>>>>>> 7ac3475eafe7acc26e3b0beb2f6c591c983eb8a5
  }

}
