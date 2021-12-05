import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

// Need na pud ni e test sa kani nga feature

export class CategoryComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });

  filterTerm! : string;

  constructor(
    private http : AdminService,
    private router : Router,
    private link : UrlService
    ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')


  ngOnInit(): void {
    this.getCategories();
  }
  categories! : Categories[];
  error : any;
  success : any;

 getCategories(){
    this.http.loading();
    this.http.getCategories(this.token).then((result)=>{
      this.categories = result.data.data;
      this.http.closeLoading();
    });
  }

  async searchCategory(){
    const result = await this.http.searchCategory(this.form.value, this.token);
    if(result.data.found){
      this.categories = result.data.data;
      console.log(this.categories);
    }else{
      this.http.ShowErrorMessage(result.data.message);
    }
  }

  update(data:any){
    this.router.navigate(['/admin/edit-category/'+data.id],{
      state: {
        data: data
      }
    })
  }

  async deleteCategory(id :any){
    const result = await this.http.deleteCategory(id, this.token);
    if(result.data.error){
      this.error = result.data.message;
    }else{
      this.success = result.data.message;
    }
  }

  async confirmDelete(category:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to DELETE "+category.name+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.value){
        this.deleteCategory(category.id).then(()=>{
          this.http.ShowSuccessMessage("SuccessFully Deleted "+category.name+"!");
          setTimeout(()=>{
            this.ngOnInit();
          },1500)
        });
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          category.name+' is still in our database.',
          'error'
        )
      }
    })
  }



}
