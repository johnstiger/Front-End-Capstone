import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  click(){
    Swal.fire({
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 1000,
    })
  }
}
