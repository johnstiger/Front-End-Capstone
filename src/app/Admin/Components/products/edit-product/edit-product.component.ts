import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories, Products } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

// Need na pud ni e test sa kani nga feature

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

  filedata : any;

  errors! : any;

  constructor(
    private service : AdminService,
    private location: Location,
    private router : ActivatedRoute,
    private link : UrlService
    ) { }

    path = this.link.setImageUrl();
    token = this.link.getToken();
    id:any;
    categories! : Categories[];

  ngOnInit(): void {

    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getProduct()
  }


  async getProduct(){
    this.service.loading();
    await this.service.getProduct(this.id, this.token).then((result)=>{
      this.product = result.data.data;
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
      this.getCategory();
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

  submit(data : any){
    this.service.loading();
    var imageData = new FormData();
    imageData.append('image', this.filedata);
   this.service.updateProduct( data, this.id, this.token ).then(async (result)=>{
     if(result.data.error){
       this.errors = result.data.message;
       if(data.image == ''){
        this.errors['image'] = ["This image is required"];
      }
    }else{
      const response = await this.service.AddImage(result.data.data.id, imageData, this.token);
      if(response.data){
        this.location.back();
      }else{
        this.errors = result.data.message;
      }
    }
    this.service.closeLoading();
   });
  }

  async getCategory(){
    const result = await this.service.getCategories(this.token);
    this.categories = result.data.data;
  }

}
