import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //Server
  private url = "https://santafe-dagom.herokuapp.com/api/";

  //Local
  // private url = "http://127.0.0.1:8000/api/";


  constructor(private http : HttpClient) { }

  response: any;


  async login(data:any){
    const response = await axios.post(this.url+"login", data);
    console.log(response)
    return response;

  }

  async register(data:any){
    const response = await axios.post(this.url+"register", data);
    return response;
  }

  async logoutUser(token:any){
    const response = await axios.get(this.url+"logout", { headers: { Authorization: token} });
    return response;
  }

  async order(token:any) {
    const response = await axios.get(this.url+"order/show/", { headers: { Authorization: token} });
    return response;
  }

  async getOrders(data:any, token:any){
    const response = await axios.get(this.url+"order", { headers: { Authorization: token} });
    return response;
  }

  async products(token:any){
    const response = await axios.get(this.url+"products/all/", { headers: { Authorization: token} });
    return response;
  }

  async getProducts(id:any, token:any) {
    const response = await axios.get(this.url+"product/show/"+id, { headers: { Authorization: token } });
    return response;
  }

  async searchProducts(data:any){
    const response = await axios.post(this.url+"search/products", data );
    return response;
  }

  //Message
  ShowSuccessMessage(message : any){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  ShowErrorMessage(message : any){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }





}
