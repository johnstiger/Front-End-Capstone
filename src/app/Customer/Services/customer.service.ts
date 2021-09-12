import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //Server
  private url = "http://santafe-dagom.herokuapp.com/api/";

  //Local
  // private url = "http://127.0.0.1:8000/api/";


  constructor(private http : HttpClient) { }

  response: any;


  async login(data:any){
    const response = await axios.post(this.url+"login", data);
    return response;
  }

  async products(){
    const response = await axios.get(this.url+"home");
    return response;
  }



}
