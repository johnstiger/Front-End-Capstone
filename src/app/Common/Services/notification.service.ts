import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket:any;
  private topic = 'notification';
  constructor() {
    this.socket = io(environment.socket.url);
  }

  sendNotification(message:any) {
    this.socket.emit(this.topic, message)
  }

  recieveNotification() {
    this.socket.on(this.topic, (message:any) => {
      document.querySelector<HTMLElement>('.badge')!.style.display = 'block';
    })
  }
}
