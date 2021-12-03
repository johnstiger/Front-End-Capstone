import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from 'src/app/Customer/Common/model/customer-model';
import { UrlService } from 'src/app/Url/url.service';
import Swal from 'sweetalert2';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})

// Need na pud ni e test sa kani nga feature

export class AdminsComponent implements OnInit {

  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });

  admins! : Admins[];
  error! : any;
  success! : any;
  userEmail! : any;
  cp : number = 1;
  filterTerm! : string;

  constructor(
    private http : AdminService,
    private router : Router,
    private link : UrlService
    ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')

  ngOnInit(): void {
    this.getAdmins();
  }

   getAdmins(){
    this.http.loading();
    this.http.admins(this.token).then((result)=>{
      if(result.data.error){
        console.log(result.data.message);
      }else{
        this.admins = result.data.data
        console.log(this.admins);
      }
      this.http.closeLoading();
    });

  }

   searchAdmins(){
    this.http.loading();
    this.http.searchAdmins(this.form.value, this.token).then((result)=>{
      if(result.data.found){
        this.admins = result.data.data;
        this.http.closeLoading();
      }else{
        this.http.ShowErrorMessage(result.data.message);
      }
    });

  }

  async deleteAdmin(id : any){
    const result = await this.http.deleteAdmin(id, this.token);
    if(result.data.error){
      this.error = result.data.message;
    }else{
      this.success = result.data.message;
    }
  }


  async confirmDelete(admin:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to DELETE "+admin.firstname+" "+admin.lastname+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.value){
        this.deleteAdmin(admin.id).then(()=>{
          this.ngOnInit();
        });
        this.http.ShowSuccessMessage("SuccessFully Deleted "+admin.firstname+" "+admin.lastname);
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          admin.firstname+" "+admin.lastname+' is still in our database.',
          'error'
        )
      }
    })
  }

  update(admin:any){
    this.router.navigate(['/admin/edit-admin/'+admin.id],{
      state: {
        data: admin
      }
    })
  }

}
