import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl: string = environment.url
  private readonly customerId: string = localStorage.getItem('customer') || '';
  private readonly token: string | string[] = localStorage.getItem('customer_token') || '';
  constructor(
    private http: HttpClient
  ) { }

  getUserInfo() {
    return this.http.get<any>(`${this.baseUrl}customer/myProfile/${this.customerId}`, {
      headers: {
        Authorization: this.token
      }
    })
  }

  create(order: any) {
    return this.http.post<any>(`${this.baseUrl}order/placed`,order , {
      headers: {
        Authorization: this.token
      }
    })
  }
}
