import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Product } from 'src/app/Admin/Common/model/admin-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  imageSrc! : string;
  UpdateProductForm = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    fileSource : new FormControl(''),
    category_id: new FormControl(''),
    price: new FormControl(''),
    sizes: new FormControl(''),
    unit_measure: new FormControl('')
  })


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
      this.UpdateProductForm = new FormGroup({
        name: new FormControl(result.data.data.name),
        image: new FormControl(result.data.data.image),
        fileSource : new FormControl(''),
        category_id: new FormControl(''),
        price: new FormControl(result.data.data.price),
        sizes: new FormControl(result.data.sizes[0].size),
        unit_measure: new FormControl(result.data.sizes[0].pivot.unit_measure)
      })

    }

  }

  onFileChange(event:any){

  }

  async submit(){

  }

}
