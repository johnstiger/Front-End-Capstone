import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from './../../Services/address.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { CustomerService } from '../../Services/customer.service';
@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  private id: number = 0
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

  customerId = localStorage.getItem('customer') || '';
  token = localStorage.getItem('customer_token') || '';
  firstname : any;
  lastname : any;
  image : any;

  constructor(private service: AddressService, private router: Router, private http :  CustomerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    this.service.getAddressById(this.id).subscribe(response => {
      Object.entries(response.data).forEach((entry) => {
        if (this.addressForm.controls[entry[0]]) {
          this.addressForm.controls[entry[0]].setValue(entry[1])
        }
      })
    })
    this.http.getCustomerProfile(this.customerId,this.token).then((res)=>{
      this.firstname = res.data.data.firstname;
      this.lastname = res.data.data.lastname;
      this.image = res.data.data.image;
      this.http.closeLoading();
    })
  }
  updateAddress() {
    Swal.fire({
      title: "Loading....",
      didOpen: () => {
        Swal.showLoading();
      }
    })
    this.service.updateAddress(this.id, this.addressForm.value).subscribe(response => {
      this.router.navigateByUrl('/addresses')
      Swal.close()
    })
  }
}
