import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AddressService } from './../../Services/address.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-addresses',
  templateUrl: './add-addresses.component.html',
  styleUrls: ['./add-addresses.component.css']
})
export class AddAddressesComponent implements OnInit {
  submitted: boolean = false
  addressForm: FormGroup = new FormGroup({
    contact_number: new FormControl('', [
      Validators.required, Validators.pattern('^(09|\\+639)\\d{9}$')
    ]),
    postal_code: new FormControl('', [
      Validators.required,
    ]),
    region: new FormControl('', [
      Validators.required
    ]),
    province: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    municipality: new FormControl('', [
      Validators.required
    ]),
    barangay: new FormControl('', [
      Validators.required
    ]),
    active: new FormControl('1', [
      Validators.required
    ])
  })

  constructor(private service: AddressService, private router: Router) { }

  ngOnInit(): void {
  }

  addAddress() {
    Swal.fire({
      title: "Loading....",
      didOpen : () => {
        Swal.showLoading();
      }
    })
    this.service.addAddress(this.addressForm.value).subscribe((data) => {
      this.router.navigateByUrl('/addresses')
      Swal.close()
    })
  }
}

