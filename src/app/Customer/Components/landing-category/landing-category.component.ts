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
  cp : number = 0;
  display : boolean = false;

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
    this.getCategory(this.id);
  }

  getCategory(id : any){
    this.service.showLoading();
    this.service.getCategoryWithProducts(id).then((res)=>{
      if(res.data.error){

      }else{
        console.log(res.data);
        this.categoryName = res.data.category;
        this.products = res.data.products;
        this.products = this.products.map((element)=>{
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
          return element;
      })
        this.service.closeLoading();
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
