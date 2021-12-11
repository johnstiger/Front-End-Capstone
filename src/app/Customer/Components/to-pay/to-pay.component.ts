import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CustomerService } from '../../Services/customer.service'

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.css']
})
export class ToPayComponent implements OnInit {

  constructor(public _customerService: CustomerService) { }
  orders:any
  selectedOrderId:any
  products:Array<any> = [];
  protected token = localStorage.getItem('customer_token')
  customerName : any;
  status : any;
  img : any;
  subtotal : any;
  display : boolean = false;
  total : number = 0;
  add : number = 70;

  async ngOnInit() {
    this.getUser();
    const  response = await this._customerService.getOrders(this.token)
    this.orders = response.data.data
    this.orders = this.orders.filter((product: any) => product.products.length > 0)
    console.log(this.orders);
    if(this.orders == undefined){
      this.display = true
    }else{
      this.selectedOrderId = this.orders[0].id
      this.products = this.orders[0].products
      this.status = this.orders[0].status
      this.subtotal = this.orders[0].total
      this.total = parseInt(this.subtotal) + this.add;

      if(this.products.length == 0){
        this.display = true
      }
    }

  }

  selectOrder() {
    this.products = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].products
    this.status = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].status
    this.subtotal = this.orders.filter((order:any) => order.id == this.selectedOrderId)[0].total
    this.total = parseInt(this.subtotal) + this.add;
  }

  async getUser(){
    this._customerService.showLoading();
    let user_id = localStorage.getItem('customer');
    const response = await this._customerService.getCustomerProfile(user_id, this.token);
    this.customerName = response.data.data.firstname+" "+response.data.data.lastname
    this._customerService.closeLoading();
    this.img = response.data.data.image
  }

  async removeItem(orderId : any, productId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to REMOVE?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then(async (result) => {
      if (result.value) {
        let data = {data:orderId};
        this._customerService.showLoading();
        const response = await this._customerService.removeProductOrder(orderId.order_id, data, this.token);
    if(response.data.error){

    }else{
      this._customerService.ShowSuccessMessage(response.data.message);
      setTimeout(()=>{
        this.ngOnInit();
      },1500)
    }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Removed Cancelled',
          'error'
        );
      }
    });
  }

}
