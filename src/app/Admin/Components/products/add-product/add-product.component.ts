import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories, Sizes } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

// Pwede na ni ipa test sa kani nga feature

export class AddProductComponent implements OnInit {

  imageSrc! : string;
  AddProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    fileSource : new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    sizes: new FormControl('', Validators.required),
    unit_measure: new FormControl('', Validators.required)
  })


  filedata:any;

  constructor(
    private http : AdminService,
    private location: Location,
    private link : UrlService
    ) { }

    // token = this.link.getToken();
    token = localStorage.getItem('admin_token')


  ngOnInit(): void {
    this.productCategories();
    this.getSizes();
  }

  errors! : any;
  success! : any;
  categories! : Categories[];
  allSize! : Sizes[];
  stockSizes: Array<any> = [];

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
    console.log(this.AddProductForm.value);

    if(this.stockSizes.length == 0){
      if(this.AddProductForm.value.sizes == '' || this.AddProductForm.value.unit_measure == ''){
        this.stockSizes = [];
      }else{
        this.stockSizes.push({
          size_id : this.AddProductForm.value.sizes,
          unit_measure : this.AddProductForm.value.unit_measure,
        })
      }
    }
    this.AddProductForm.value.sizes = this.stockSizes
    this.http.addProduct(this.AddProductForm.value, this.token).then(async (result)=>{
      if(result.data.error){
        this.errors = result.data.message;
        this.http.closeLoading();
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.location.back();
        },1500)
      }
    }).catch((e)=>{
      console.log(e);
    });


  }

  async productCategories(){
    const result = await this.http.getCategories(this.token);
    console.log(result.data);
    this.categories = result.data.error ? false : result.data.data;
  }

  async getSizes(){
    const result = await this.http.getSizes(this.token);
    this.allSize = result.data.error ? [] : result.data.data;
  }

  addSize(params : any){
    let value = params.AddProductForm.value
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
        unit_measure : value.unit_measure,
        size_id : productId,
      })
      value.sizes = '';
      value.unit_measure = '';
    }
  }

  delete(params : any){
    console.log(params);
    this.stockSizes.forEach((element, index) => {
      if(params.size == element.size){
        (document.getElementById(""+ params.size_id +"") as HTMLInputElement).disabled = false;
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