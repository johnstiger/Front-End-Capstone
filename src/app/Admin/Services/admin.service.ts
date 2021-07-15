import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //Server
  // private url = "http://santafe-dagom.herokuapp.com/api/";

  //Local
  private url = "http://127.0.0.1:8000/api/";

  constructor() { }

  headers = { headers: { Authorization : localStorage.getItem('admin_token')} }

  async dashboard(){
    const response = await axios.get(this.url+"admin/dashboard", this.headers );
    return response;
  }

  async products(){
    const response = await axios.get(this.url+"product/all", this.headers );
    return response;
  }

  // Search
  async searchProducts(data : any){
    const response = await axios.post(this.url+"search/products", data, this.headers );
    return response;
  }

}
