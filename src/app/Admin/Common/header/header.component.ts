import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/Url/url.service';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private service: AdminService,
    private link :  UrlService
    ) { }

  // token = this.link.getToken();
  token = localStorage.getItem('admin_token')

  name! : any;
  ngOnInit(): void {
    this.getUser();
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

}
