import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { Categories } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})

// Need pud ni e test sa kani nga feature

export class EditCategoryComponent implements OnInit {

  constructor(
    private http : AdminService,
    private location : Location,
    private router: ActivatedRoute,
    private link : UrlService
    ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')


  errors! : any;
  success! : any;
  category! : Categories;
  name! : any;

  id : any;

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getCategory();
  }

  getCategory()
  {
    this.http.loading();
    this.http.getCategory(this.id, this.token).then((result)=>{
      this.name = result.data.data.name;
      this.http.closeLoading();
    });
  }

   submit(data:any){
    this.http.loading();
    this.http.updateCategory(this.id, data, this.token).then((result)=>{
      if(result.data.error){
        this.errors = result.data.message;
     }else{
       this.location.back();
     }
     this.http.closeLoading();
    });

  }

}
