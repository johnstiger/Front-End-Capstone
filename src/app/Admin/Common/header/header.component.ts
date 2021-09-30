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

  ngOnInit(): void {
  }


  async logout(){
    const result = this.service.logoutUser(this.token);
    localStorage.clear();
    window.location.reload();
  }

}
