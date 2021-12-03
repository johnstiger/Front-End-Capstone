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

  emailForm = new FormGroup({
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });


  error : any;
  emailError : any;
  display = 'none';

  constructor(private router : Router, private service : CustomerService, private message : AdminService) { }

  ngOnInit(): void {

  }

  async login(){
    this.service.showLoading();
    const result =  await this.service.login(this.form.value);
    if(result.data.error){
      this.router.navigate(['/login']);
      this.error = result.data.message;
      this.service.closeLoading();
    }else if(result.data.data.is_admin){
      window.localStorage.setItem('admin_token', "Bearer "+result.data.access_token);
      this.router.navigate(['/admin/dashboard']);
    }else {
      window.localStorage.setItem('customer_token', "Bearer "+result.data.access_token);
      localStorage.setItem('customer',result.data.data.id);
      this.router.navigate(['']);
      this.service.closeLoading();
    }
  }

  forgetPassword(){
    this.display = 'block'
  }

  onCloseHandled(){
    this.display = 'none'
  }


  sendEmail(){
    this.service.showLoading();
    this.service.sendEmail(this.emailForm.value).then((res)=>{
      console.log(res);
      if(res.data.error){
        this.emailError = res.data.message
        this.service.closeLoading();
      }else{
        this.service.closeLoading();
        sessionStorage.setItem('user_email',res.data.data.email);
        this.router.navigate(['reset-password=?/'+res.data.data.id]);
      }
    })
  }

}
