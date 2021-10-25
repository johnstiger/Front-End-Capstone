import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories } from 'src/app/Customer/Common/model/customer-model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

// Pwede na ni ipa test sa kani nga feature

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

  filedata:any;

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
      this.filedata = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.AddProductForm.patchValue({
          fileSource : reader.result
        });
      };
    }
  }


  submit(){
    this.http.loading();
    var data = new FormData();
    data.append('image', this.filedata);

    this.http.addProduct(this.AddProductForm.value, this.token).then(async (result)=>{
      if(result.data.error){
        this.errors = result.data.message;
        if(this.AddProductForm.value.image == ''){
          this.errors['image'] = ["This image is required"];
        }
      }else{
        const response = await this.http.AddImage(result.data.data.id, data, this.token);
        if(response.data.error){
          this.errors = response.data.message;
          if(this.AddProductForm.value.image == ''){
            this.errors['image'] = ["This image is required"];
          }
        }else{
          this.location.back();
        }
      }
      this.http.closeLoading();
    }).catch((e)=>{
      console.log(e);
    });


  }

  async gategories(){
    const result = await this.http.getCategories(this.token);
    this.categories = result.data.error ? false : result.data.data;

  }


}
