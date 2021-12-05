import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Address, AddressesResponse, AddressByIdResponse } from './../Common/model/customer-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly baseUrl: string = environment.url
  private readonly customerId: string = localStorage.getItem('customer') || '';
  private readonly token: string | string[] = localStorage.getItem('customer_token') || '';
  constructor(
    private http: HttpClient
  ) { }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}customer/address/${this.customerId}`, address, {
      headers: {
        Authorization: this.token
      }
    })
  }

  getAddresses(): Observable<AddressesResponse> {
    return this.http.get<AddressesResponse>(`${this.baseUrl}customer/address/${this.customerId}/all`, {
      headers: {
        Authorization: this.token
      }
    })
  }

  getAddressById(id: number): Observable<AddressByIdResponse> {
    return this.http.get<AddressByIdResponse>(`${this.baseUrl}customer/address/${id}`, {
      headers: {
        Authorization: this.token
      }
    }
    )
  }

  updateAddress(id: number, address: Address): Observable<AddressByIdResponse> {
    return this.http.put<AddressByIdResponse>(`${this.baseUrl}customer/address/${id}`, address, {
      headers: {
        Authorization: this.token
      }
    }
    )
  }
}
