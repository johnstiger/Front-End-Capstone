import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/Customer/Common/model/customer-model';
import { AdminService } from '../../Services/admin.service';
import Swal from 'sweetalert2';
import { UrlService } from 'src/app/Url/url.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

// Kulang kay ang pag add sa on sale product
// Gikan sa kani nga component
// Hint kay gamiton ang id sa product

export class ProductsComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });

  success! : any;
  error! : any;
  page : Number = 1;

  products! : Products[];

  constructor( private service : AdminService, private router : Router, private link : UrlService ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token');
  path = this.link.setImageUrl();
  cp : number = 1;
  ngOnInit(): void {
    this.getProducts();
  }

  searchProducts(){
    this.service.searchProducts(this.form.value, this.token).then((result)=>{
      if(result.data.found){
        this.products = result.data.data;
      }else{
        this.service.ShowErrorMessage(result.data.message);
      }
    });
  }

  async getProducts(){
    this.service.loading();
    const result = await this.service.products(this.token).then((res)=>{
      if(res.data.error){
        this.service.ShowErrorMessage(res.data.message);
      }else{
        this.products = res.data.data;
        this.products = this.products.map(res => {
          const size = res.sizes.map((size:any, ndx : any) => {
            return size.pivot.avail_unit_measure
          })
          let total_avail_unit_measure = 0
          if (size.length) {
            total_avail_unit_measure = size.reduce((total:any, num:any) => total + num)
          }
          res['total_avail_unit_measure'] = total_avail_unit_measure
          return res
        })
      }
    this.service.closeLoading();
   });

  }

  async deleteProduct(id:any){
    const result = await this.service.deleteProduct(id, this.token).then((result)=>{
      if(result.data.error){
        this.error = result.data.message;
      }else{
        this.success = result.data.message;
      }
    });
  }

  update(product:any){
    this.router.navigate(['/admin/edit-product/'+product.id],{
      state: {
        data: product
      }
    })
  }

  addToSale(product : any){
    this.router.navigate(['/admin/add-sales/'+product.id],{
          state: {
            data: product
          }
        })
  }


  async confirmDelete(product:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to DELETE "+product.name+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.value){
        this.deleteProduct(product.id).then(()=>{
          this.ngOnInit();
        });
        this.service.ShowSuccessMessage("SuccessFully Deleted Product!");
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          product.name+' is still in our database.',
          'error'
        )
      }
    })
  }


}
