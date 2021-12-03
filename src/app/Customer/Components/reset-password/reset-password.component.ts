import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  verificationCode = new FormGroup({
    code : new FormControl(''),
  });

  correctCode = false;
  error : any;
  success : any;
  constructor(
    private service : CustomerService,
    private router : ActivatedRoute,
    private route : Router,
    private location : Location
  ) { }
    id : any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
  }

  sendAgain(){
    this.service.loading()
    this.verificationCode.value.email = sessionStorage.getItem('user_email');
    this.service.sendEmail(this.verificationCode.value).then((res)=>{
      if(res.data.error){
        this.error = res.data.message
      }else{
        this.success = res.data.message
        sessionStorage.clear();
      }
      this.service.closeLoading();
    })

  }

  return(){
    sessionStorage.clear();
    this.location.back();
  }

  resetPassword(){
    this.service.showLoading();
    this.service.resetPassword(this.id, this.verificationCode.value).then((res)=>{
      console.log(res.data.message);
      if(res.data.error){
        this.error = res.data.message
        this.service.closeLoading();
      }else{
        this.service.ShowSuccessMessage(res.data.message);
        setTimeout(()=>{
          this.route.navigate(['/new-password=?/'+this.id]);
        },1500)
      }
    });
  }

}
