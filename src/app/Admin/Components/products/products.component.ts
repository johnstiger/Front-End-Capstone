import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Products } from 'src/app/model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Products[];

  constructor( private data: DataService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.data.getProducts().subscribe(data => {
      console.log(data);
    })
  }
}
