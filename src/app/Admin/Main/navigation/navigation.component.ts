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
    $(".burger-menu").click(() => {
       $(".side-wrapper").toggle("slow", function (){
         $(this).is(":hidden") ? $(".main-content").attr('style','width: calc(100% - 10px) !important')
         : $(".main-content").attr('style','width: calc(100% - 252px) !important')
      });
    });
  }
 logout(){
   this.router.navigate(['/']);
   window.localStorage.removeItem('admin_token');
 }

}
