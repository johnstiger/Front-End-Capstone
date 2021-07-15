import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sample-header',
  templateUrl: './sample-header.component.html',
  styleUrls: ['./sample-header.component.css']
})
export class SampleHeaderComponent implements OnInit {

  constructor() { }

  change = false;

  ngOnInit(): void {
  }

  openNav() {
    $('#mySidenav').css('width','100%');
  }
  closeNav() {
    $('#mySidenav').css('width','0');
  }

  category(){
    this.change = !this.change;
    const value = $("#dropdown");
    this.change == true ? value.css('display','block') : value.css('display','none');
  }

}
