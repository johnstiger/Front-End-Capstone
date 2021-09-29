import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Product } from 'src/app/Admin/Common/model/admin-model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  imageSrc! : string;
  product! : Product[];
  image! : string;
  name! : string;
  category_id! : number;
  price! : number;
  sizes! : string;
  unit_measure! : number;


  token = localStorage.getItem('admin_token');
  errors! : any;

  constructor(
    private http : AdminService,
    private location: Location,
    private router : ActivatedRoute
    ) { }

    id:any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );

    this.getProduct();

  }


  async getProduct(){
    const result = await this.http.getProduct(this.token, this.id);
    if(result.data.error){

    }else{
      this.product = result.data.data;
    }

  }

  onFileChange(event:any){

  }

  async submit(any : any){

  }

}
