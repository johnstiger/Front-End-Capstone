import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { SalesProduct } from '../../Common/model/admin-model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-on-sale',
  templateUrl: './product-on-sale.component.html',
  styleUrls: ['./product-on-sale.component.css']
})

// Wala pa gyapon ni na trabaho dave
// Trabaho a ni as soon as possible

export class ProductOnSaleComponent implements OnInit {

  constructor(
    private http : AdminService,
    private router : Router
    ) { }

  filterTerm! : string;
  token = localStorage.getItem('admin_token');

  sales : SalesProduct[] = [];
  cp : number = 1;

  ngOnInit(): void {
    this.getSalesProduct();
  }

  filterTable(){
    var input, filter, table, tr, td, i, txtValue;
     input = (<HTMLInputElement>document.getElementById('myInput'));
     filter = input.value.toUpperCase();
     table = (<HTMLTableElement>document.getElementById('productOnSale'))
     tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
           tr[i].style.display = "";
          } else {
           tr[i].style.display = "none";
         }
        }
      }
  }

  getSalesProduct(){
    this.http.loading();
    this.http.salesProduct(this.token).then((result)=>{
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message)
      }else{
        this.sales = result.data.data
        console.log(this.sales);

        this.http.closeLoading();
      }
    })
  }

  async deleteSales(id:any){
    const result = await this.http.removeSalesProduct(id, this.token).then((result)=>{
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message)
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          window.location.reload();
        },1500)
      }
    });
  }

  delete(salesItem : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to DELETE "+salesItem.products.name+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.value){
        this.deleteSales(salesItem.id);
        this.http.ShowSuccessMessage("SuccessFully Deleted Product!");
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          salesItem.products.name+' is still in our database.',
          'error'
        )
      }
    })
  }

  edit(salesItem:any){
    this.router.navigate(['/admin/edit-sales/'+salesItem.id],{
      state: {
        data: salesItem
      }
    })
  }


}
