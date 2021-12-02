import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesProduct } from 'src/app/Admin/Common/model/admin-model';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css']
})
export class EditSaleComponent implements OnInit {

  constructor(
    private router : ActivatedRoute,
    private url : UrlService,
    private http : AdminService,
    private location : Location
    ) { }

  token = localStorage.getItem('admin_token');
  path = this.url.setImageUrl();
  image : any;
  salesItem! : SalesProduct;
  name! : any;
  percent_off : any;
  unit_measure : any;
  promo_type : any;
  size : any;
  status : any;
  total : any;
  price : any;
  products : any;
  category : any;
  description : any;
  errors : any;
  sizes: Array<any> = [];
  newId : any;

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.newId = params.get('id');
      }
    );
    this.getSalesProduct();
  }


  getSalesProduct(){
    this.http.loading();
    this.http.getSalesItem(this.newId,this.token).then((result)=>{
      console.log(result.data);

      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message);
      }else{
        this.salesItem = result.data.data;
        this.name = this.salesItem.products.name;
        this.percent_off = this.salesItem.percent_off
        this.unit_measure = this.salesItem.unit_measure
        this.promo_type = this.salesItem.promo_type
        this.size = this.salesItem.size
        this.total = this.salesItem.total
        this.price = this.salesItem.products.price
        this.products = this.salesItem.products
        this.category = this.salesItem.category
        this.description = this.salesItem.description
        this.image = this.salesItem.products.image
        this.sizes = this.salesItem.products.sizes
        this.http.closeLoading();
        console.log(this.sizes);

      }
    });
  }


  submit(form:any){
    this.http.loading()
    this.http.updateSalesItem(this.newId, form, this.token).then((result)=>{
      if(result.data.error){
        this.errors = result.data.message;
        this.http.closeLoading();
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.location.back();
        },1500)
      }
    });
  }

}
