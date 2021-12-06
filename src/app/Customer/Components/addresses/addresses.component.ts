import { AddressService } from './../../Services/address.service';
import { Component, OnInit } from '@angular/core';
import { Address } from '../../Common/model/customer-model';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  public addresses: Address[] = []
  private readonly customerId: string = localStorage.getItem('customer') || '';

  constructor(private service: AddressService) { }

  ngOnInit(): void {
    this.service.getAddresses().subscribe(response => {
      this.addresses = response.data
    })
  }

}
