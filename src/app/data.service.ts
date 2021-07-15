import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Products } from './model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Dev Server
  // private url = "http://santafe-dagom.herokuapp.com/api/";

  //LocalHost
  private url = "http://127.0.0.1:8000/api/";

  constructor( private http : HttpClient) { }

  getProducts(){
    return this.http.get<Products>(this.url+'home');
  }

}
