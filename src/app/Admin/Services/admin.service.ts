import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //Server
  // private url = "http://santafe-dagom.herokuapp.com/api/";

  //Local
  private url = "http://127.0.0.1:800/api/";

  constructor() { }

  async products(){
    const response = await axios.get(this.url+"product/all");
    return response;
  }


  // Search
  async searchProducts(data : any, token : any){
    const response = await axios.post(this.url+"search/products", data, token);
    return response;
  }

}
