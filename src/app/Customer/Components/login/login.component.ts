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
  public passwordType: string = 'password';
  public Password: boolean = false;
  public passwordHidden: boolean = false;

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
      window.localStorage.setItem('user_id', result.data.data.id);
      this.router.navigate(['/admin/dashboard']);
    }else {
      window.localStorage.setItem('customer_token', "Bearer "+result.data.access_token);
      localStorage.setItem('customer',result.data.data.id);
      // this.router.navigate(['']);
      this.checkLocalStorage();
      this.service.closeLoading();
    }
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

  checkLocalStorage() {
    if(localStorage.getItem('products')) {
      this.router.navigate(['/order-page'])
    }else if(localStorage.getItem('addToCart')){
      this.router.navigate(['/cart'])
    }else{
      this.router.navigate([''])
    }
  }





}
