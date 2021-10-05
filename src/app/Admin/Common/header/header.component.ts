import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: AdminService) { }

  token = localStorage.getItem('admin_token');
  name! : any;
  ngOnInit(): void {
    this.getUser();
  }

  async getUser(){
    const result = await this.service.getUser();
    this.name = result.data.firstname;
  }


  async logout(){
    const result = await this.service.logoutUser();
    localStorage.clear();
    window.location.reload();
  }

}
