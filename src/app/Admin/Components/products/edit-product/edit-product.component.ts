import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories, Products, Sizes } from 'src/app/Customer/Common/model/customer-model';
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
  sizes : number = 0;
  allSize! : Sizes [];
  unit_measure! : number;
  sChoose! : number;
  stockSizes: Array<any> = [];

  filedata : any;

  errors! : any;

  constructor(
    private service : AdminService,
    private location: Location,
    private router : ActivatedRoute,
    private link : UrlService
    ) { }

    token = localStorage.getItem('admin_token');
    id:any;
    categories! : Categories[];
    fileSource : any;

  ngOnInit(): void {

    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getSize();
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
        this.stockSizes = this.product.sizes
        this.stockSizes.forEach((element)=>{
          this.allSize.forEach((test)=>{
            if(element.id == test.id){
              (document.getElementById(""+ element.id +"") as HTMLInputElement).disabled = true;
            }
          })
        })
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
      console.log(file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.filedata = this.imageSrc;
      };
    }
  }

  submit(data : any){
    this.service.loading();
    data.fileSource = this.filedata != undefined ? this.filedata : data.image;
    data.sizes = this.stockSizes;
   this.service.updateProduct( data, this.id, this.token ).then(async (result)=>{
     if(result.data.error){
       this.errors = result.data.message;
    }else{
      this.location.back();
    }
    this.service.closeLoading();
   });
  }

  async getCategory(){
    const result = await this.service.getCategories(this.token);
    this.categories = result.data.data;
  }

  async getSize(){
    const result = await this.service.getSizes(this.token);
    this.allSize = result.data.error ? false : result.data.data;
  }

  // addSize
  addSize(params : any){
    let value = params
    if(value.sizes != '' && value.unit_measure != ''){
      let test = '';
      let productId;
      (document.getElementById("unit_measure") as HTMLInputElement).value = '';
      (document.getElementById("size") as HTMLInputElement).value = '';
      this.allSize.forEach((element, index)=>{
        if(element.id == value.sizes){
          (document.getElementById(""+ element.id +"") as HTMLInputElement).disabled = true;
          test = element.size
          productId = element.id
        }
      })
      this.stockSizes.push({
        size : test,
        pivot : {
          avail_unit_measure : value.unit_measure,
          sizes_id : productId
        },
        size_id : productId,
      })
      value.sizes = '';
      value.unit_measure = '';
    }
  }
  // delete
  delete(params : any){
    this.stockSizes.forEach((element, index) => {
      if(params.size == element.size){
        (document.getElementById(""+ element.pivot.sizes_id +"") as HTMLInputElement).disabled = false;
        this.stockSizes.splice(index, 1)
      }
    })
  }

  noSizesChoose($event : any){
    let test = document.getElementById(''+$event.value+'') as HTMLLIElement
    const buttonSize = document.querySelector<HTMLElement>('.add-size')!;
    if(test.innerHTML == 'N/A'){
      buttonSize.style.display ='none'
      this.stockSizes.forEach((element, index) => {
        (document.getElementById(""+ element.size_id +"") as HTMLInputElement).disabled = false;
      })
      this.stockSizes = []
    }else{
      buttonSize.style.display = 'block';
    }
  }
}
