import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Admins } from 'src/app/Customer/Common/model/customer-model';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  imageSrc! : any;
  firstname : any;
  lastname : any;
  email : any;
  contact_number : any;
  image : any;
  id : any;
  admin! : Admins;
  password! : any;

  token = localStorage.getItem('admin_token');

  constructor(private service : AdminService) {

   }

  ngOnInit(): void {
    this.getUser();
  }



 async submit(data:any){
  Swal.fire({
    title:'Updating Your Information.'
  });
  Swal.showLoading();
    const result = await this.service.updateAdmin(data.id, data, this.token).then((result)=>{
      if(result.data.error){
        Swal.fire({title:'Oops! Something is incorrect.'})
      }else{
        this.ngOnInit();
        Swal.close();
      }
    });
  }

  async getUser(){
    Swal.fire({
      title: 'Processing...',
      didOpen: ()=> {
        Swal.showLoading();
      }
    })
    const result = await this.service.getUser(this.token).then((result)=>{
    this.firstname = result.data.firstname;
    this.lastname = result.data.lastname;
    this.email = result.data.email;
    this.contact_number = result.data.contact_number;
    this.image = result.data.image;
    this.id = result.data.id;
    Swal.close();
    });


  }

  onFileChange(event:any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        // this.AddProductForm.patchValue({
        //   fileSource : reader.result
        // });
      };
    }
  }

  resetPassword(id:any){
    Swal.fire({
      title: 'Reset Password',
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      showLoaderOnConfirm: true,
      html: '<input name="current_password" type="password" id="swal-input1" class="swal2-input" placeholder="Current Password" style="width:82%">' +
      '<input name="password" type="password" id="swal-input2" class="swal2-input" placeholder="New Password" style="width:82%">' +
      '<input name="password_confirmation" type="password" id="swal-input3" class="swal2-input" placeholder="Confirm Password" style="width:82%">',
      preConfirm: () => {
        return new Promise((resolve)=>{
          resolve(
            {
              'current_password': $('#swal-input1').val(),
              'password' : $('#swal-input2').val(),
              'password_confirmation' : $('#swal-input3').val(),
            }
          )
        })
      },
      didOpen: ()=>{
        $('#swal-input1').focus()
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res)=>{
      console.log(JSON.stringify(res.value));
    })

  }

}
