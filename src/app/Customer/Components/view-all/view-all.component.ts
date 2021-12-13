import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  constructor(
    private router : ActivatedRoute,
    private service : CustomerService,
    private route : Router
  ) { }

  title : string = '';
  suggestId : any;
  salesItem : Array<any> = [];
  products : Array<any> = [];
  showSuggestProducts : boolean = false;
  cp : number = 0;
  salesPage : number = 0;
  maxSaleDisplay : number = 6;
  maxProductDisplay : number = 12;

  ngOnInit(): void {

    this.router.paramMap.subscribe(
      params=>{
       this.suggestId =  params.get('id')
      }
    );

    if(this.suggestId == '1'){
      this.title = 'Hot Sales';
      this.showSuggestProducts = true;
      this.getProductsWithoutSale();
      this.getSalesProduct();
    }else if(this.suggestId == '2'){
      this.title = 'All Products';
      console.log(this.showSuggestProducts);

      this.getProducts();
    }

  }


  getSalesProduct(){
    this.service.getSales().then((res)=>{
      if(res.data.error){

      }else{
        this.salesItem = res.data.data;
        console.log(this.salesItem.map(res=>{
          const sizes = res.sizes.map((element:any)=>{
            return element.size
          })
          if(sizes.length > 1){
            res.availableSize = sizes[0]+'-'+sizes[sizes.length - 1];
          }else if(sizes.length == 1){
            res.availableSize = sizes[0];
          }else{
            res.availableSize = [];
          }
          return res;
        }));

      }
    })
  }

  async getProductsWithoutSale() {
    this.service.showLoading();
    const result = await this.service.products('');
    if(result.data.error){
    }else{
      this.products = result.data.message == "No data yet!" ? [] : result.data.data

      this.products.forEach((product: any) => {
        product.sizes = product.sizes.filter((size: any) => size.pivot.avail_unit_measure > 0)
      })
      this.products = this.products.map(res=>{
        const sizes = res.sizes.map((element:any)=>{
            return element.size
        })
        if(sizes.length > 1){
          res.availableSize = sizes[0]+'-'+sizes[sizes.length - 1];
        }else if(sizes.length == 1){
          res.availableSize = sizes[0];
        }else{
          res.availableSize = [];
        }
        return res;
      })

    }

    this.service.closeLoading();
  }

  async getProducts() {
    this.service.showLoading();
    const result = await this.service.viewAllProducts('token');
    if(result.data.error){

    }else{
      this.products = result.data.message == "No data yet!" ? [] : result.data.data
      this.products.forEach((product: any) => {
        product.sizes = product.sizes.filter((size: any) => size.pivot.avail_unit_measure > 0)
      })
      this.products = this.products.map(res=>{
        const sizes = res.sizes.map((element:any)=>{
            return element.size
        })
        if(sizes.length > 1){
          res.availableSize = sizes[0]+'-'+sizes[sizes.length - 1];
        }else if(sizes.length == 1){
          res.availableSize = sizes[0];
        }else{
          res.availableSize = [];
        }
        return res;
      })
      this.service.closeLoading();
    }
  }

  select(product:any){
    this.route.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }
}
