import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admins } from 'src/app/Customer/Common/model/customer-model';
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
  address : any;
  image : any;
  id : any;
  admin! : Admins;

  token = localStorage.getItem('admin_token');

  constructor(private service : AdminService,
    private location: Location,
    private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

 async submit(data:any){
    const result = await this.service.updateAdmin(data.id, data, this.token);
    console.log(result.data);
    if(result.data.error){
    }else{
      this.ngOnInit();
    }
  }

  async getUser(){
    const result = await this.service.getUser(this.token);
    this.firstname = result.data.firstname;
    this.lastname = result.data.lastname;
    this.email = result.data.email;
    this.contact_number = result.data.contact_number;
    this.image = result.data.image;
    this.id = result.data.id;
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
