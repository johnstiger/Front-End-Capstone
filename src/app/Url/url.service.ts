import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  // url = "http://localhost:8000/api/";
  url = "https://santafe-dagom.herokuapp.com/api/";
  // image = "http://localhost:8000/img/"
  image = "https://santafe-dagom.herokuapp.com/img/";

  token = localStorage.getItem('admin_token')

  setUrl(){
    return this.url;
  }

  getToken(){
    return this.token;
  }

  setImageUrl(){
    return this.image;
  }
}
