import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Admin/Services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  AddCategoryForm = new FormGroup({
    name: new FormControl('')
  });

  errors! : any;

  token = localStorage.getItem('admin_token');

  constructor(private http : AdminService, private location : Location) { }

  ngOnInit(): void {
  }

  async submit(){
    const result = await this.http.addCategory(this.AddCategoryForm.value, this.token);
    if(result.data.error){
      this.errors = result.data.message;
    }else{
      this.location.back();
    }
  }
}
