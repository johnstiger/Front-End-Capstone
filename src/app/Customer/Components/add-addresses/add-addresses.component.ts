import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AddressService } from './../../Services/address.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-addresses',
  templateUrl: './add-addresses.component.html',
  styleUrls: ['./add-addresses.component.css'],
})
export class AddAddressesComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  customerId = localStorage.getItem('customer') || '';
  token = localStorage.getItem('customer_token') || '';
  firstname: any;
  lastname: any;
  image: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AddressService,
    private http: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      contact_number: [
        null,[
        Validators.required,
        Validators.pattern('^(09|\\+639)\\d{9}$')],
      ],
      postal_code: [null, [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern('[0-9]{4}')]
      ],
      province: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      municipality: new FormControl('', [Validators.required]),
      barangay: new FormControl('', [Validators.required]),
      active: new FormControl('1', [Validators.required]),
    });

    this.http.getCustomerProfile(this.customerId, this.token).then((res) => {
      this.firstname = res.data.data.firstname;
      this.lastname = res.data.data.lastname;
      this.image = res.data.data.image;
      this.http.closeLoading();
    });
  }


  isFieldValid(field: string) {
    return !this.form.get(field)?.valid && this.form.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }

  addAddress() {
    Swal.fire({
      title: "Loading....",
      didOpen : () => {
        Swal.showLoading();
    }
    })
    if(this.form.valid) {
      this.service.addAddress(this.form.value).subscribe((data) => {
        this.router.navigateByUrl('/addresses')
        Swal.close()
      })
    }
  }
}
