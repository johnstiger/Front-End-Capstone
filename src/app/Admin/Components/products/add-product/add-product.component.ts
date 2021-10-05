import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories } from 'src/app/Customer/Common/model/customer-model';

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

  constructor(private http : AdminService, private location: Location) { }

  ngOnInit(): void {
    this.gategories();
  }

  errors! : any;
  success! : any;
  categories! : Categories[];

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
    const result = await this.http.addProduct(this.AddProductForm.value);
    if(result.data.error){
      this.errors = result.data.message;
    }else{
      this.location.back();
    }

  }

  async gategories(){
    const result = await this.http.getCategories();
    this.categories = result.data.error ? false : result.data.data;

  }


}
