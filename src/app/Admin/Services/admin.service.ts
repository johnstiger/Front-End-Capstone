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

  token = localStorage.getItem('admin_token');

  auth = {headers:{Authorization: this.token}};

  async getUser(){
    const response = await axios.get(this.url+"user", this.auth);
    return response;
  }

  async products(){
    const response = await axios.get(this.url+"product/all", this.auth);
    return response;
  }

  async getProduct( id:any){
    const response = await axios.get(this.url+"product/show/"+id, this.auth);
    return response;
  }

  async addProduct( data: any){
    const response = await axios.post(this.url+"product/newProduct", data , this.auth);
    return response;
  }

  async updateProduct( data: any, id:any){
    const response = await axios.put(this.url+"product/update/"+id, data, this.auth);
    return response;
  }

  async deleteProduct( id:any){
    const response = await axios.delete(this.url+"product/delete/"+id, this.auth);
    return response;
  }

  // Search Product
  async searchProducts(data : any){
    const response = await axios.post(this.url+"search/items", data, this.auth);
    return response;
  }

  //Logout
  async logoutUser(){
    const response = await axios.get(this.url+"logout", this.auth);
    return response;
  }


  //Admin
  async addAdmin(data :any){
    const response = await axios.post(this.url+"admin/register", data, this.auth);
    return response;
  }

  //Admins
  async admins(){
    const response = await axios.get(this.url+"admin/admins", this.auth);
    return response;
  }

  //Search Admins
  async searchAdmins(data: any){
    const response = await axios.post(this.url+"search/admin", data, this.auth);
    return response;
  }

  //remove admin
  async deleteAdmin(id : any){
    const response = await axios.delete(this.url+"admin/delete/"+id, this.auth)
    return response;
  }

  //get Admin
  async getAdmin(id: any){
    const response = await axios.get(this.url+"admin/show/"+id, this.auth);
    return response;
  }

  //update Admin
  async updateAdmin(id:any, data: any){
    const response = await axios.put(this.url+"admin/update/"+id, data, this.auth);
    return response;
  }

  //categories
  async getCategories(){
    const response = await axios.get(this.url+"category/all", this.auth);
    return response;
  }

  //get Category
  async getCategory(id:any){
    const response = await axios.get(this.url+"category/show/"+id, this.auth);
    return response;
  }

  //update Category
  async updateCategory(id:any, data:any){
    const response = await axios.put(this.url+"category/update/"+id, data , this.auth);
    return response;
  }

  //add Category
  async addCategory(data:any){
    const response = await axios.post(this.url+"category/newCategory", data, this.auth);
    return response;
  }

  //delete Category
  async deleteCategory(id : any){
    const response = await axios.delete(this.url+"category/delete/"+id, this.auth);
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
