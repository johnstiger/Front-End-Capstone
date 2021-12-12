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
  }

  // publishNotification() {
  //   this.notificationService.sendNotification('this is a message')
  // }
}
