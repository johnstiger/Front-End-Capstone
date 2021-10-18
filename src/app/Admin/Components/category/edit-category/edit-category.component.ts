import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories } from 'src/app/Customer/Common/model/customer-model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private http : AdminService, private location : Location, private router: ActivatedRoute) { }

  errors! : any;
  success! : any;
  category! : Categories;
  name! : any;

  id : any;

  token = localStorage.getItem('admin_token');

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getCategory();
  }

  async getCategory()
  {
    const result = await this.http.getCategory(this.id, this.token);
    this.name = result.data.data.name;
  }

  async submit(data:any){
    const result = await this.http.updateCategory(this.id, data, this.token);
    console.log(result.data);

    if(result.data.error){
      this.errors = result.data.message;
   }else{
     this.location.back();
   }
  }

}
