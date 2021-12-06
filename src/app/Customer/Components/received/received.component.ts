import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Products } from '../../Common/model/customer-model';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {
  commentForm = new FormGroup({
    message : new FormControl('')
  })
  constructor(
    private _customerService: CustomerService
  ) { }
    token = localStorage.getItem('customer_token');
    customerName : any;
    img : any;
    products : Array<any> = [];
    temporary : Array<any> = [];
    error : any;
    productName : any;
    productImg : any;
    productId : any;
    display = "none";
    product! : Products

  ngOnInit(): void {
    this.getUser();
    this.getReceivedOrders()
  }



  async getUser(){
    let user_id = localStorage.getItem('customer');
    const response = await this._customerService.getCustomerProfile(user_id, this.token);
    this.customerName = response.data.data.firstname+" "+response.data.data.lastname
    this.img = response.data.data.image
  }


  async getReceivedOrders(){
    const response = await this._customerService.receivedOrders(this.token);
    this.temporary = response.data;
    this.temporary = this.temporary.map(res=>{
      const product = res.products.map((result:any)=>{
        if(res.delivery != null){
          var date_test = new Date(res.delivery.delivery_recieve_date.replace(/-/g,"/"));
          result.receivedData = date_test.toLocaleDateString("en",{month:'long',day:"numeric",year:"numeric"});
        }
        return result;
      })
      return res;
    })
    this.temporary.forEach((order:any) => {
      this.products.push(...order.products)
      console.log(this.products)
    })
  }

  comment(product : any){
    this.display = "block";
    this.productName = product.name;
    this.productImg = product.image;
    this.productId = product.id;
    console.log(product);
  }

  async submit(){
    this._customerService.showLoading();
    const response = await this._customerService.comment(this.productId, this.commentForm.value, this.token);
    console.log(response);
    if(response.data.error){
      this.error = response.data.message;
      this._customerService.closeLoading();
    }else{
      this._customerService.ShowSuccessMessage(response.data.message);
      setTimeout(()=>{
        this.onCloseHandled();
        this.ngOnInit();
      },1500)
    }

  }

  onCloseHandled(){
    this.display = "none"
  }

}
