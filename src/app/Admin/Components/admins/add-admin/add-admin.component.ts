import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  imageSrc! : string;
  AddAdminForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    image: new FormControl(''),
    fileSource : new FormControl(''),
    contact_number: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation : new FormControl(''),
  })

  errors! : any;
  success! : any;

  filedata : any;

  constructor(
    private http : AdminService,
    private location: Location,
    private link : UrlService
    ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')


  ngOnInit(): void {
  }

  onFileChange(event:any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      this.filedata = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.AddAdminForm.patchValue({
          fileSource : reader.result
        });
      };
    }
  }


  async submit(){
    this.http.loading();
    // var imageData = new FormData();
    // imageData.append('image', this.filedata);

    await this.http.addAdmin(this.AddAdminForm.value, this.token).then(async (result)=>{
      if(result.data.error){
        this.errors = result.data.message;
      }else{
        this.http.showMessage(result.data.message);
        setTimeout(() => {
          this.location.back();
        }, 2000);
        // const response = await this.http.adminImage(result.data.data.id, imageData, this.token);
        // if(response.data.error){
        //   this.errors = response.data.message;
        // }else{
        // }
      }
      this.http.closeLoading();
    });
  }

}
