import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Admin/Common/model/admin-model';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Products, Sizes } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {


  constructor(
    private url : UrlService,
    private service : AdminService,
    private route : Router,
    private router : ActivatedRoute,
    private location : Location,
    ) { }

  token = localStorage.getItem('admin_token');
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
  selectedSizes : Array<any> = [];
  selectName : boolean = false;
  unitErrors : Array<any> = [];
  currentPage = true;
  name : string = ''

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.newId = params.get('id');
      }
    );
    this.getProductsName()
    if(this.newId){
      this.onChange(this.newId);
      this.currentPage = false;
      this.selectedSizes = history.state.productSize
      console.log(this.selectedSizes);
    }else{
      this.getSize();
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
        this.selectName = true;
        this.image = this.product.image
        this.price = this.product.price
        this.name = this.product.name
        this.description = this.product.description;
        this.allSize = this.product.sizes
        this.size = this.product.sizes.length > 0 ? this.product.sizes[0].id : 0;
        this.unit_measure = this.size > 0 ? this.product.sizes[0].pivot.avail_unit_measure : 0;
      }

      if(event > 0){
        this.allSize = this.product.sizes
        this.currentPage = false;
      }else{
        this.currentPage = true;
      }

      this.service.closeLoading();
    }).catch((error)=>{
      console.log(error);
    })
}

submit(data : any){
  this.service.loading();
  if($('#selected').val() == null && $('#productname').val() == null){
    this.service.ShowErrorMessage('Please Choose Product')
  }else{
    if(!this.currentPage){
      data.size = this.selectedSizes;
      data.unit_measure = 0;
      this.addToSale(data);
    }else{
      this.allSize.forEach((element)=>{
        let select = document.getElementById(''+element.id+'') as HTMLInputElement
        console.log(element, select.value);
        if(parseInt(select.value) > element.pivot.avail_unit_measure){
          this.unitErrors.push(element.size)
        }else{
          element.pivot.sales_item = parseInt(select.value);
          element.pivot.avail_unit_measure = element.pivot.avail_unit_measure - parseInt(select.value);
        }
      })

      if(this.unitErrors.length > 0){
        this.service.ShowErrorMessage('number selected is out of range to this Sizes: '+this.unitErrors)
        this.unitErrors = [];
      }else{
        data.size = this.allSize
        data.unit_measure = 0;
        this.addToSale(data);
      }
    }
  }

}

  addToSale(data : any){
    this.service.getSalesProduct(this.id, data, this.token).then((result)=>{
      if(result.data.error){
        this.error = result.data.message;
        this.service.closeLoading();
      }else{
        this.service.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.route.navigate(['/admin/product-on-sale'])
        },1500)
      }
    }).catch(err => {
      console.log(err);
    })
  }

async getSize(){
  const result = await this.service.getSizes(this.token);
  this.allSize = result.data.error ? false : result.data.data;
}

  // Trigger during changing the quantity
  enterUnitMeasure(event : any){
    console.log(event);

  }

// Return to previous page
  return(){
    this.location.back();
  }

  // Delete Specific size
  delete(size : any){
    this.allSize.forEach((element, index)=>{
      if(element.id == size.id){
        this.allSize.splice(index,1);
      }
    })
    if(this.allSize.length == 0){
      this.selectName = false;
    }
  }
}
