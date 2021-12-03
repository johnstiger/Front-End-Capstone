import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm = new FormGroup({
    password : new FormControl(''),
    password_confirmation : new FormControl('')
  });
  error : any;
  id : any;
  constructor(
    private service : CustomerService,
    private router : ActivatedRoute,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
  }

  resetPassword(){
    this.service.showLoading();
    this.service.newPassword(this.id, this.newPasswordForm.value).then((res)=>{
      console.log(res.data);
      if(res.data.error){
        this.error = res.data.message
        this.service.closeLoading();
      }else{
        this.service.ShowSuccessMessage(res.data.message);
        setTimeout(()=>{
          this.route.navigate(['/']);
        },1500)

      }
    })
  }
}
