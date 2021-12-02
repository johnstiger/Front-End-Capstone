import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm = new FormGroup({
    password : new FormControl(''),
    password_confirmation : new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }

  resetPassword(){
    console.log(this.newPasswordForm.value);

  }
}
