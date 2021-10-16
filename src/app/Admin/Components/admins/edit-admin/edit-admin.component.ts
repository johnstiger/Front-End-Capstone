import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Admins } from 'src/app/Customer/Common/model/customer-model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  imageSrc! : string;
  admin! : Admins;
  firstname! : string;
  lastname! : string;
  image! : string;
  contact_number! : number;
  email! : string;
  password! : string;

  errors : any;
  success : any;

  token = localStorage.getItem('admin_token');

  constructor(
    private service : AdminService,
    private location: Location,
    private router : ActivatedRoute
    ) { }

    id: any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );

    this.getAdmin();

  }

  async getAdmin(){
    const result = await this.service.getAdmin(this.id, this.token);
    this.admin = result.data.data;
    this.id = this.admin.id;
    this.firstname = this.admin.firstname;
    this.lastname = this.admin.lastname;
    this.contact_number = this.admin.contact_number;
    this.email = this.admin.email;
    this.password = this.admin.password;
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

  async submit(data: any){
    const result = await this.service.updateAdmin(this.id, data, this.token);
    if(result.data.error){
      this.errors = result.data.message;
   }else{
     this.location.back();
   }
  }

}
