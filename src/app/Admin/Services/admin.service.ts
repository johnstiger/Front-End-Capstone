import { Injectable } from '@angular/core';
import axios from 'axios';
import { UrlService } from 'src/app/Url/url.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private link : UrlService) { }

  // token = localStorage.getItem('admin_token');

  url = this.link.setUrl();

  // auth = {headers:{Authorization: this.token}};

  //dashboard
  async dashboard(token:any){
    const response = await axios.get(this.url+"admin/dashboard",{headers:{Authorization:token}});
    return response;
  }

  async getUser(token:any){
    const response = await axios.get(this.url+"user", {headers:{Authorization:token}});
    return response;
  }

  async products(token:any){
    const response = await axios.get(this.url+"product/all", {headers:{Authorization:token}});
    return response;
  }

  async getProduct( id:any, token:any){
    const response = await axios.get(this.url+"product/show/"+id, {headers:{Authorization:token}});
    return response;
  }

  async addProduct( data: any, token:any){
    const response = await axios.post(this.url+"product/newProduct", data , {headers:{Authorization:token}});
    return response;
  }

  async AddImage(id : any, data: any, token : any){
    const response = await axios.post(this.url+"product/saveImage/"+id, data, {headers:{
      'Content-Type' : 'multipart/form-data',
      Authorization:token
    }});
    return response;
  }

  async adminImage(id : any, data : any, token : any){
    const response = await axios.post(this.url+"admin/saveImage/"+id, data, {headers:{
      'Content-Type' : 'multipart/form-data',
      Authorization : token
    }})
    return response;
  }

  async updateProduct( data: any, id:any, token:any){
    const response = await axios.put(this.url+"product/update/"+id, data, {headers:{Authorization:token}});
    return response;
  }

  async deleteProduct( id:any, token:any){
    const response = await axios.delete(this.url+"product/delete/"+id, {headers:{Authorization:token}});
    return response;
  }

  // Search Product
  async searchProducts(data : any, token:any){
    const response = await axios.post(this.url+"search/items", data, {headers:{Authorization:token}});
    return response;
  }

  //Logout
  async logoutUser(token:any){
    const response = await axios.get(this.url+"logout", {headers:{Authorization:token}});
    return response;
  }


  //Admin
  async addAdmin(data :any, token:any){
    const response = await axios.post(this.url+"admin/register", data, {headers:{Authorization:token}});
    return response;
  }

  //Admins
  async admins(token:any){
    const response = await axios.get(this.url+"admin/admins", {headers:{Authorization:token}});
    return response;
  }

  //Search Admins
  async searchAdmins(data: any, token:any){
    const response = await axios.post(this.url+"search/admin", data, {headers:{Authorization:token}});
    return response;
  }

  //remove admin
  async deleteAdmin(id : any, token:any){
    const response = await axios.delete(this.url+"admin/delete/"+id, {headers:{Authorization:token}})
    return response;
  }

  //get Admin
  async getAdmin(id: any, token:any){
    const response = await axios.get(this.url+"admin/show/"+id, {headers:{Authorization:token}});
    return response;
  }

  //update Admin
  async updateAdmin(id:any, data: any, token:any){
    const response = await axios.put(this.url+"admin/update/"+id, data, {headers:{Authorization:token}});
    return response;
  }

  //update Password Admin
  async resetPassword(id:any, data: any, token:any){
    const response = await axios.put(this.url+"admin/resetPassword/"+id, data, {headers:{Authorization:token}});
    return response;
  }

  //categories
  async getCategories(token:any){
    const response = await axios.get(this.url+"category/all", {headers:{Authorization:token}});
    return response;
  }

  //get Category
  async getCategory(id:any, token:any){
    const response = await axios.get(this.url+"category/show/"+id, {headers:{Authorization:token}});
    return response;
  }

  //update Category
  async updateCategory(id:any, data:any, token:any){
    const response = await axios.put(this.url+"category/update/"+id, data , {headers:{Authorization:token}});
    return response;
  }

  //add Category
  async addCategory(data:any, token:any){
    const response = await axios.post(this.url+"category/newCategory", data, {headers:{Authorization:token}});
    return response;
  }

  //delete Category
  async deleteCategory(id : any, token:any){
    const response = await axios.delete(this.url+"category/delete/"+id, {headers:{Authorization:token}});
    return response;
  }

  //search Category
  async searchCategory(data:any, token:any){
    const response = await axios.post(this.url+"search/category", data, {headers:{Authorization:token}});
    return response;
  }

  //get all Customers
  async getCustomers(token:any){
    const response = await axios.get(this.url+"admin/customers",{headers:{Authorization:token}});
    return response;
  }

  //search Customers
  async searchCustomers(data:any, token:any){
    const response = await axios.post(this.url+"search/customers",data,{headers:{Authorization:token}});
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

  loading(){
    Swal.fire({
      title: 'Loading....',
      didOpen: ()=>{
        Swal.showLoading();
      }
    })
  }

  closeLoading(){
    Swal.close();
  }

}