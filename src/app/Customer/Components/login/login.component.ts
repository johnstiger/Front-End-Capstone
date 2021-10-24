import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password : new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router : Router, private service : CustomerService, private message : AdminService) { }

  ngOnInit(): void {
  }

  error : any;

  async login(){
    const result =  await this.service.login(this.form.value);
    if(result.data.error){
      this.router.navigate(['/login']);
      this.message.ShowErrorMessage(result.data.message);
    }else if(result.data.data.is_admin){
      window.localStorage.setItem('admin_token', "Bearer "+result.data.access_token);
      this.router.navigate(['/admin/dashboard']);
    }else{
      window.localStorage.setItem('customer_token', "Bearer "+result.data.access_token);
      this.router.navigate(['/landing']);
    }
  }




}