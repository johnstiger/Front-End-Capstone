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

  ngOnInit(): void {

    this.router.paramMap.subscribe(
      params=>{
       this.suggestId =  params.get('id')
      }
    );

    if(this.suggestId == '1'){
      this.title = 'Hot Sales';
      this.showSuggestProducts = true;
      this.getProducts();
      this.getSalesProduct();
    }else if(this.suggestId == '2'){
      this.title = 'All Products';
      this.getProducts();
    }

  }


  getSalesProduct(){
    this.service.getSales().then((res)=>{
      if(res.data.error){

      }else{
        this.salesItem = res.data.data;
        console.log();

      }
    })
  }

  async getProducts() {
    const result = await this.service.products('token');
    if(result.data.error){

    }else{
      this.products = result.data.data;
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
  }

  select(product:any){
    console.log(product);

    this.route.navigate(['/selected/'+product.id],{
      state: {
        data: product
      }
    })
  }
}
