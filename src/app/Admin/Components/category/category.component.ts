import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/Customer/Common/model/customer-model';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private http : AdminService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  categories! : Categories[];
  error : any;
  success : any;

  searchProducts(){

  }

  async getCategories(){
    const result = await this.http.getCategories();
    this.categories = result.data.data;
  }

  update(data:any){

  }

  async deleteCategory(id :any){
    const result = await this.http.deleteCategory(id);
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
