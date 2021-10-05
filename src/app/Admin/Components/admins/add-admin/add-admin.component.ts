import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';

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
  })

  errors! : any;
  success! : any;

  constructor(private http : AdminService, private location: Location) { }

  ngOnInit(): void {
  }

  async submit(){
    const result = await this.http.addAdmin(this.AddAdminForm.value);
    if(result.data.error){
      this.errors = result.data.message;
    }else{
      this.location.back();
    }
  }

  onFileChange(event:any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.AddAdminForm.patchValue({
          fileSource : reader.result
        });
      };
    }
  }

}
