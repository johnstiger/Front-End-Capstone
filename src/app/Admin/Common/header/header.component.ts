import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Common/Services/notification.service';
import { UrlService } from 'src/app/Url/url.service';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  message : any;
  constructor(
    private service: AdminService,
    private link :  UrlService,
    private notificationService:NotificationService
    )
    {
      this.notificationService.recieveNotification();
    }


  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')

  name! : any;
  ngOnInit(): void {
    this.getUser();
    this.getPendingOrders();
  }

  async getUser(){
    const result = await this.service.getUser(this.token);
    this.name = result.data.firstname;
  }


  async logout(){
    this.service.loading();
    const result = await this.service.logoutUser(this.token);
    localStorage.clear();
    window.location.reload();
  }


  getPendingOrders(){
    this.service.loading();
    this.service.pendingOrders(this.token).then((result) =>{
      if(result.data.error){
        this.service.ShowErrorMessage(result.data.message)
      }else{
        if(result.data.data){
          document.querySelector<HTMLElement>('.badge')!.innerHTML = result.data.data.length;
        }
      }
      this.service.closeLoading();
    })
  }

}
