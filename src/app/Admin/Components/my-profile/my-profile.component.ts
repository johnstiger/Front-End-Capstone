import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admins } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

// Kulang kay nig update sa image bisan wala siya ge input
// kay mag error siya.....

export class MyProfileComponent implements OnInit {

  newPasswordForm = new FormGroup({
    current_password: new FormControl(''),
    password: new FormControl(''),
    password_confirmation : new FormControl(''),
  })

  display ='none';
  imageSrc! : any;
  firstname : any;
  lastname : any;
  email : any;
  contact_number : any;
  image : any;
  id : any;
  admin! : Admins;
  password! : any;

  error! : any;
  resetError : any;

  filedata : any;

  constructor(
    private service : AdminService,
    private link : UrlService
    ) {}

  //  token = this.link.getToken();
  token = localStorage.getItem('admin_token')

   path = this.link.setImageUrl();


  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.service.loading();
    this.service.getUser(this.token).then((result)=>{
      this.firstname = result.data.firstname;
      this.lastname = result.data.lastname;
      this.email = result.data.email;
      this.contact_number = result.data.contact_number;
      this.image = result.data.image;
      this.id = result.data.id;
      this.service.closeLoading();
    }).catch((e)=>{
      console.log(e);
    });
  }

  onFileChange(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files
      this.filedata = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.filedata = this.imageSrc
      };
    }
  }

   submit(data:any){
    this.service.loading();
    // var imageData = new FormData();
    // imageData.append('image', this.filedata);
    data.fileSource = this.filedata != undefined ? this.filedata : data.image;

    this.service.updateAdmin(data.id, data, this.token).then(async (result)=>{
    if(result.data.error){
      this.error = result.data.message
    }else{
      this.service.ShowSuccessMessage(result.data.message);
      this.ngOnInit();
      // const response = await this.service.adminImage(result.data.data.id, imageData, this.token);
      // if(response.data.error){
      //   this.error = response.data.message;
      //   this.service.closeLoading();
      // }else{
      // }
    }
    }).catch((e)=>{
      console.log(e);
      this.service.closeLoading();
    });
  }

  resetPassword(id:any){
    this.service.loading();
    this.service.resetPassword(id, this.newPasswordForm.value, this.token).then((result)=>{
      if(result.data.error){
        this.resetError = result.data.message;
        this.service.closeLoading();
      }else{
        this.display='none';
        this.service.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      }
    })
  }

  hideShowPassword(input : any, className : any){
    var x = (<HTMLInputElement>document.getElementById(input));
    var icon = document.getElementById(className);
    if(x.type == 'password'){
      x.type = 'text';
      (<HTMLHtmlElement>icon).className = 'far fa-eye-slash';
    }else{
      x.type = 'password';
      (<HTMLHtmlElement>icon).className  = 'far fa-eye';
    }

  }

  showCurrentPassword(){
    this.hideShowPassword('currentPassword', 'cpIcon');
  }

  showPassword(){
    this.hideShowPassword('password', 'pIcon');
  }

  showConfirmedPassword(){
    this.hideShowPassword('confirmed','cIcon');
  }

  openModal(){
    this.display='block';
 }

onCloseHandled(){
  this.display='none';
}
}
