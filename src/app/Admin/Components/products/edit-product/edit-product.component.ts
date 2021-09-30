import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { FormControl, FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  imageSrc! : string;
  product! : Products;
  name! : string;
  price! : string;
  image! : string;
  part! : string;
  status! : boolean;
  category_id! : number;
  sizes! : any;
  unit_measure! : number;
  noSize! : number;


  token = localStorage.getItem('admin_token');
  errors! : any;

  constructor(
    private service : AdminService,
    private location: Location,
    private router : ActivatedRoute
    ) { }

    id:any;

  ngOnInit(): void {

    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );

    this.product = history.state.data;
    this.id = this.product.id;
    this.name = this.product.name;
    this.price = this.product.price;
    this.image = this.product.image;
    this.part = this.product.part;
    this.status = this.product.status;
    this.category_id = this.product.category_id;
    if(this.product.sizes.length > 0){
      this.sizes = this.product.sizes[0].id;
      this.unit_measure = this.product.sizes[0].pivot.unit_measure
    }else{
      this.sizes = 0;
      this.unit_measure = 0;
    }

  }


  async getProduct(){
    const result = await this.service.getProduct(this.token, this.id);


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

  async submit(data : any){
   const result = await this.service.updateProduct(this.token, data, this.id );
   if(result.data.error){
     this.errors = result.data.message;
  }else{
    this.location.back();
  }
  }

}
