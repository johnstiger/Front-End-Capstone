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
      title: 'Sweet!',
      html: 'I will close in <b></b> milliseconds.',
      imageUrl: 'https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png',
      imageWidth: 400,
      timer: 2000,
      imageHeight: 200,
      imageAlt: 'Custom image',
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




}
