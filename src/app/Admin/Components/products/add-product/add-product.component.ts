import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  imageSrc! : string;
  AddProductForm = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    fileSource : new FormControl(''),
    category_id: new FormControl(''),
    price: new FormControl(''),
    sizes: new FormControl(''),
    unit_measure: new FormControl('')
  })

  token = localStorage.getItem('admin_token');


  constructor(private http : AdminService, private location: Location) { }

  ngOnInit(): void {
  }

  errors! : any;
  success! : any;

  onFileChange(event:any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.AddProductForm.patchValue({
          fileSource : reader.result
        });
      };
    }
  }


  async submit(){

    console.log(this.AddProductForm.value);
    const result = await this.http.addProduct(this.token, this.AddProductForm.value);
    if(result.data.error){
      this.errors = result.data.message;
    }else{
      this.location.back();
    }

  }


}
