import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

// Need na pud ni e test sa kani nga feature

export class AddCategoryComponent implements OnInit {

  AddCategoryForm = new FormGroup({
    name: new FormControl('')
  });

  errors! : any;

  constructor(
    private http : AdminService,
    private location : Location,
    ) { }

    // token = this.link.getToken();
    token = localStorage.getItem('admin_token')



  ngOnInit(): void {
  }

  submit(){
    this.http.loading();
    this.http.addCategory(this.AddCategoryForm.value, this.token).then((result)=>{
      if(result.data.error){
        this.errors = result.data.message;
        this.http.closeLoading();
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(() => {
          this.location.back();
        }, 1500);
      }
    });
  }
}
