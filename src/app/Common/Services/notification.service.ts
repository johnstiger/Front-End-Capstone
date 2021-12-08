import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket:any;
  private topic = 'notification';
  private counter : number = 0;
  constructor() {
    this.socket = io(environment.socket.url);
  }

  sendNotification(message:any) {
    this.socket.emit(this.topic, message)
  }

  recieveNotification() {
    this.socket.on(this.topic, (message:any) => {
      this.counter++;
      window.location.reload()
      document.querySelector<HTMLElement>('.badge')!.style.display = 'block';
      document.querySelector<HTMLElement>('.badge')!.innerHTML = this.counter.toString();
    })
  }
}

export enum NOFICATION_MSG {
  NEW_ORDER = 'New order purchase.',
}
