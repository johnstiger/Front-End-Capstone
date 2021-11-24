import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

// testing
import { NotificationService } from './Common/Services/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.projectName;
  url = environment.url;

  // testing
  constructor(private notificationService:NotificationService)
  {
    this.notificationService.recieveNotification('notification')
  }

  publishNotification() {
    this.notificationService.sendNotification('notification', 'this is a message')
  }
}
