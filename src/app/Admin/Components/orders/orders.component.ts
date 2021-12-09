import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Orders } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

// Wala pay back end url ani

export class OrdersComponent implements OnInit {
  form = new FormGroup({
    data : new FormControl('',[
      Validators.required
    ])
  });

  filterTerm! : string;

  token = localStorage.getItem('admin_token');
  constructor(private http : AdminService) { }

  errors : any;
  orders! : Orders[];
  message : any;
  search = "";
  cp : number = 1;

  ngOnInit(): void {
    this.getAllOrders();
  }

  searchProducts() {
    this.search = this.form.value.data;
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.orders = this.orders.filter(res => {
        return (
          res.customer.firstname
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase()) ||
          res.customer.lastname
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase()) ||
          res.products.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
        );
      });
    }
  }

  getAllOrders(){
    this.http.loading();
    this.http.getAllOrders(this.token).then((result) => {
      console.log(result.data);
      if(result.data.error){
        this.errors = result.data.message
      }else if(result.data.message == 'No data yet!'){
        this.message = result.data.message
      }else{
        this.orders = result.data.data;
      }
      this.http.closeLoading();
    });
  }


  orderReceived(order:any){
    this.http.loading();
    this.http.receivedCustomerOrder(order.id, this.token).then((res)=>{
      if(res.data.error){
        this.http.ShowErrorMessage(res.data.message)
      }else{
        this.http.ShowSuccessMessage(res.data.message)
        setTimeout(() => {
          this.ngOnInit();
        }, 1500);
      }
    })
  }

}
