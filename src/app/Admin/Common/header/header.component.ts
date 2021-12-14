import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Common/Services/notification.service';
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
    private router : Router,
    private notificationService:NotificationService
    )
    {
      this.notificationService.recieveNotification();
    }


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
    await this.service.logoutUser(this.token);
    localStorage.clear();
    window.location.reload();
  }


  getPendingOrders(){
    this.service.loading();
    this.service.getNotification(this.token).then((result) =>{
      if(result.data.error){
        this.service.ShowErrorMessage(result.data.message)
      }else{
        if(result.data.data){
          document.querySelector<HTMLElement>('.badge')!.innerHTML = result.data.data.length;
          document.querySelector<HTMLElement>('.badge')!.style.display = 'block';
        }else{
          document.querySelector<HTMLElement>('.badge')!.style.display = 'none';
        }
      }
      this.service.closeLoading();
    })
  }

  notification(){
    this.service.loading();
    this.service.updateViewOrders(this.token).then((res)=>{
      if(res.data.error){
        this.service.ShowErrorMessage(res.data.message);
      }else{
        this.router.navigate(['/admin/pending-orders']);
      }
    })
  }

}
