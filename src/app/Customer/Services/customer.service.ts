import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //Server
  // private url = "http://santafe-dagom.herokuapp.com/api/";

  //Local
  private url = "http://127.0.0.1:8000/api/";


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

  async orders(data:any){
    const response = await axios.get(this.url+"orders", data);
    return response;
  }

  async products(data:any) {
    const response = await axios.get(this.url+"products", data);
    return response;
  }



}
