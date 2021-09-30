import { Injectable } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //Server
  // private url = "http://santafe-dagom.herokuapp.com/api/";

  //Local
  private url = "http://127.0.0.1:8000/api/";

  constructor() { }

  async products(token:any){
    const response = await axios.get(this.url+"product/all", { headers: { Authorization: token }});
    return response;
  }

  async getProduct(token:any, id:any){
    const response = await axios.get(this.url+"product/show/"+id, { headers: { Authorization: token }});
    return response;
  }

  async addProduct(token:any, data: any){
    const response = await axios.post(this.url+"product/newProduct", data , {headers: { Authorization: token }});
    return response;
  }

  async updateProduct(token:any, data: any, id:any){
    const response = await axios.put(this.url+"product/update/"+id, data, { headers: { Authorization: token } });
    return response;
  }

  async deleteProduct(token:any, id:any){
    const response = await axios.delete(this.url+"product/delete/"+id, { headers: { Authorization: token } });
    return response;
  }

  // Search
  async searchProducts(data : any, token : any){
    const response = await axios.post(this.url+"search/items", data, {headers:{Authorization: token}});
    return response;
  }

  //Logout
  async logoutUser(token: any){
    const response = await axios.get(this.url+"logout", {headers: { Authorization: token }});
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
