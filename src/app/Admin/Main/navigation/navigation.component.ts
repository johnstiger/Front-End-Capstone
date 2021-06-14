import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    $("#menu-toggle").click(function(e) {
      $("#wrapper").toggleClass("toggled");
    });
  }
 logout(){
   this.router.navigate(['/']);
   window.localStorage.removeItem('admin_token');
 }

}
