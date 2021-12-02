import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-landing-category',
  templateUrl: './landing-category.component.html',
  styleUrls: ['./landing-category.component.css']
})
export class LandingCategoryComponent implements OnInit {

  id : any;
  products : Array<any> = [];
  categoryName : String = '';

  constructor(
    private service : CustomerService,
    private router : ActivatedRoute,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getCategory();
  }


  getCategory(){
    this.service.getCategoryWithProducts(this.id).then((res)=>{
      if(res.data.error){

      }else{
        this.products = res.data.data;
        this.categoryName = res.data.data[0].name;
        this.products = this.products.map((res, indx)=>{
          const sizes = res.products.map((element:any, index : any)=>{
            const el = element.sizes.map((test:any)=>{
              return test.size
            })
            if(el.length > 1){
              element.size = el[0]+'-'+el[el.length -1]
            }else if(el.length == 1){
              element.size = el[0]
            }else{
              element.size = []
            }
          })
          return res.products;
        })
        this.products = this.products[0];
        console.log(this.products, this.categoryName);

      }
    });
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
