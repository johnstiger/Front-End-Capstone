import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/Customer/Common/model/customer-model';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });

  token = localStorage.getItem('admin_token');

  constructor(private http : AdminService, private router : Router) { }

  ngOnInit(): void {
    this.getCategories();
  }
  categories! : Categories[];
  error : any;
  success : any;

  searchProducts(){

  }

  async getCategories(){
    const result = await this.http.getCategories(this.token);
    this.categories = result.data.data;
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
          this.ngOnInit();
        });
        this.http.ShowSuccessMessage("SuccessFully Deleted "+category.name+"!");
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
