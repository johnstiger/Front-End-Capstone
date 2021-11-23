import { Injectable } from '@angular/core';
import { io } from 'ngx-socket-io'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket:any;
  constructor() {
    this.socket = io(environment.socket.url);
  }

  sendNotification(topic:string, message:string) {
    this.socket.emit(topic, message)
  }

  recieveNotification(topic:string) {
    this.socket.on(topic, (message:any) => {
      console.log(message)
    })
  }
}
