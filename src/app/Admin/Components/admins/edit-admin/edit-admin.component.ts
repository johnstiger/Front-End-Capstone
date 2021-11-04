import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Admins } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';

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

  errors : any;
  success : any;

  constructor(
    private service : AdminService,
    private location: Location,
    private router : ActivatedRoute,
    private link : UrlService
    ) { }

    path = this.link.setImageUrl();
    // token = this.link.getToken();
    token = localStorage.getItem('admin_token')
    filedata : any;

    id: any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );

    this.getAdmin();

  }

   getAdmin(){
    this.service.loading();
     this.service.getAdmin(this.id, this.token).then((result)=>{
      this.admin = result.data.data;
      this.id = this.admin.id;
      this.firstname = this.admin.firstname;
      this.lastname = this.admin.lastname;
      this.contact_number = this.admin.contact_number;
      this.email = this.admin.email;
      this.image = this.admin.image;
      this.service.closeLoading();
    });
  }

  onFileChange(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      this.filedata = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  // Kani kulang ani kay ang pag update sang password sa admin
  submit(data: any){
    this.service.loading();
    var imageData = new FormData();
    imageData.append('image', this.filedata);
    this.service.updateAdmin(this.id, data, this.token).then( async (result)=>{
      if(result.data.error){
        this.errors = result.data.message;
      }else{
        const response = await this.service.adminImage(result.data.data.id, imageData, this.token);
        if(response.data.error){
          this.errors = response.data.message;
        }else{
          this.location.back();
        }
      }
      this.service.closeLoading();
    });

  //   if(result.data.error){
  //     this.errors = result.data.message;
  //  }else{
  //    this.location.back();
  //  }
  }

}
