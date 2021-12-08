import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { UrlService } from 'src/app/Url/url.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private link: UrlService,
    private router: Router
  ) {}

  response: any;
  // url = this.link.setUrl();
  url = environment.url;

  async login(data: any) {
    const response = await axios.post(this.url + 'login', data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }

  async register(data: any) {
    const response = await axios.post(this.url + 'register', data);
    return response;
  }

  async logoutUser(token: any) {
    const response = await axios.get(this.url + 'logout', {
      headers: { Authorization: token }
    });
    return response;
  }

  async order(token: any) {
    const response = await axios.get(this.url + 'order/show/', {
      headers: { Authorization: token }
    });
    return response;
  }

  async getOrders(token: any) {
    const user_id = localStorage.getItem('customer');
    const response = await axios.get(this.url + 'orders/' + user_id, {
      headers: { Authorization: token }
    });
    return response;
  }

  async products(token: any) {
    const response = await axios.get(this.url + 'home');
    return response;
  }

  async countProductsInCart(token: any) {
    const response = await axios.get(this.url + 'cart/count', {
      headers: { Authorization: token }
    });
    return response;
  }

  async getCategories() {
    const response = await axios.get(this.url + 'allCategory');
    return response;
  }

  async getCategoryWithProducts(id: any) {
    const response = await axios.get(this.url + 'getCategory/' + id);
    return response;
  }

  async getSales() {
    const response = await axios.get(this.url + 'sales');
    return response;
  }

  // async getProducts(id:any, token:any) {
  //   const response = await axios.get(this.url+"product/show/"+id, { headers: { Authorization: token } });
  //   return response;
  // }

  async getProducts(token: any) {
    const response = await axios.get(this.url + 'cart/show', {
      headers: { Authorization: token }
    });
    return response;
  }

  async searchProducts(data: any) {
    const response = await axios.post(this.url + 'search/products', data);
    return response;
  }

  async getProduct(id: any) {
    const response = await axios.get(this.url + 'dagom/' + id);
    return response;
  }

  async getCategory(id: any, token: any) {
    const response = await axios.get(this.url + 'category/show/' + id, {
      headers: { Authorization: token }
    });
    return response;
  }

  async getSizes(token: any) {
    const response = await axios.get(this.url + 'product/sizes', {
      headers: { Authorization: token }
    });
    return response;
  }

  async addtoCart(id: any, quantity: any, token: any) {
    const response = await axios.post(this.url + 'cart/add/' + id, quantity, {
      headers: { Authorization: token }
    });
    return response;
  }

  async sendEmail(data: any) {
    const response = await axios.post(this.url + 'forgot-password', data);
    return response;
  }

  async resetPassword(id: any, data: any) {
    const response = await axios.post(this.url + 'reset-password/' + id, data);
    return response;
  }

  async newPassword(id: any, data: any) {
    const response = await axios.post(this.url + 'new-password/' + id, data);
    return response;
  }
  async checkOut(data: any, token: any) {
    const response = await axios.get(this.url + 'order/checkout', {
      headers: { Authorization: token }
    });
    return response;
  }

  async showProducts(token: any) {
    const response = await axios.get(this.url + 'order/show', {
      headers: { Authorization: token }
    });
    return response;
  }

  async deleteProduct(id: any, token: any) {
    const response = await axios.delete(this.url + `cart/delete/${id}`, {
      headers: { Authorization: token }
    });
    return response;
  }

  async getCustomerProfile(id: any, token: any) {
    const response = await axios.get(this.url + 'customer/myProfile/' + id, {
      headers: { Authorization: token }
    });
    return response;
  }

  async customerChangePassword(data: any, token: any) {
    const response = await axios.post(
      this.url + 'customer/reset-password',
      data,
      { headers: { Authorization: token } }
    );
    return response;
  }

  async editCustomerAccount(data: any, token: any) {
    const response = await axios.put(this.url + 'customer/information', data, {
      headers: { Authorization: token }
    });
    return response;
  }

  async receivedOrders(token: any) {
    const response = await axios.get(this.url + 'orders/receivedOrders', {
      headers: { Authorization: token }
    });
    return response;
  }

  async removeProductOrder(orderId: any, data: any, token: any) {
    const response = await axios.post(
      this.url + 'orders/removeOrder/' + orderId,
      data,
      { headers: { Authorization: token } }
    );
    return response;
  }

  async updateCartProduct(id: number, data: any, token: any) {
    const response = await axios.put(this.url + `cart/update/${id}`, data, {
      headers: { Authorization: token }
    });
    return response;
  }

  // Comment section
  async comment(productId: any, data: any, token: any) {
    const response = await axios.post(
      this.url + 'comment/create/' + productId,
      data,
      { headers: { Authorization: token } }
    );
    return response;
  }

  //Message
  ShowSuccessMessage(message: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'Okay thank you!'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }

  ShowErrorMessage(message: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showLoading() {
    Swal.fire({
      title: 'Loading....',
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  loading() {
    Swal.fire({
      title: 'Loading....',
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  closeLoading() {
    Swal.close();
  }

  // cart to order information

  orderProducts!: any;
}
