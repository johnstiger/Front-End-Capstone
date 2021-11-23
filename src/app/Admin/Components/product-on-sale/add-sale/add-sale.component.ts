import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Admin/Common/model/admin-model';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Products, Sizes } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  constructor(
    private url : UrlService,
    private service : AdminService,
    private router : ActivatedRoute,
    private location : Location
    ) { }

  token = localStorage.getItem('admin_token');
  path = this.url.setImageUrl();
  products! : Product[];
  image : any;
  product! : Products;
  description : any;
  unit_measure : any;
  size : any;
  percent_off : any;
  promo_type : any;
  price : any;
  id : any;
  newId : any;
  allSize! : Sizes[];
  error : any;
  select: any;

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.newId = params.get('id');
      }
    );

    if(this.newId){
      this.onChange(this.newId);
    }else{
      this.getSize();
    }

    this.getProductsName();

  }


  // Testing
  getProductNameSelect(selecteds:any) : any {
    let selected;
    for (selected of selecteds) {
       if (selected.id == 'selected') {
         return selected
       }
    }
  }

  getProductsName(){
       this.service.products(this.token).then((result)=>{
         if(result.data.error){
           this.service.ShowErrorMessage(result.data.message);
         }else{
           this.products = result.data.data;
         }
       }).catch((error)=>{
         console.log(error);
       })
  }

  onChange(event:any) {
    this.service.loading()
    this.id = event > 0  ? event : event.target.value;
    this.service.getProduct(this.id , this.token).then((result)=>{
      if(result.data.error){
        this.service.ShowErrorMessage(result.data.message)
      }else{
        this.product = result.data.data;
        this.image = this.product.image
        this.price = this.product.price
        this.description = this.product.description;
        this.size = this.product.sizes.length > 0 ? this.product.sizes[0].id : 0;
        this.unit_measure = this.size > 0 ? this.product.sizes[0].pivot.avail_unit_measure : 0;
      }

      if(event > 0){
        this.allSize = this.product.sizes
      }

      this.service.closeLoading();
    }).catch((error)=>{
      console.log(error);
    })
}

submit(data : any){
  this.service.loading();
  this.service.getSalesProduct(this.id, data, this.token).then((result)=>{
    if(result.data.error){
      this.error = result.data.message;
    }else{
      this.location.back();
    }
    this.service.closeLoading();
  }).catch(err => {
    console.log(err);
  })
}


async getSize(){
  const result = await this.service.getSizes(this.token);
  this.allSize = result.data.error ? false : result.data.data;
}

}
