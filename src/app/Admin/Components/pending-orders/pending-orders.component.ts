import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Data, Orders } from '../../Common/model/admin-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})


export class PendingOrdersComponent implements OnInit {

  constructor(private http : AdminService) { }

  TrackingCodeForm = new FormGroup({
    tracking_code : new FormControl(''),
    name_of_deliver_company : new FormControl(''),
    shipping_fee : new FormControl('')
  })

  token = localStorage.getItem('admin_token');
  orders! : Orders [];
  data : Data[] = [];
  display ='none';
  customerName : any;
  customerOrders : Array<any> = [];
  orderId : any;
  customerId : any;
  currentPage : number = 1;
  total : number = 0;
  error : any;
  displayModalTracking = 'none'
  filterTerm! : string;
  firstModal : number = 1;
  secondModal : number = 1;

  ngOnInit(): void {
    this.getPendingOrders();
  }

  filterTable(){
    var input, filter, table, tr, td, i, txtValue;
     input = (<HTMLInputElement>document.getElementById('myInput'));
     filter = input.value.toUpperCase();
     table = (<HTMLTableElement>document.getElementById('pendingOrder'))
     tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
           tr[i].style.display = "";
          } else {
           tr[i].style.display = "none";
         }
        }
      }
  }



  // Get All Pending Orders
  getPendingOrders(){
    this.http.loading();
    this.http.pendingOrders(this.token).then((result) =>{
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message)
      }else{
        this.orders = result.data.data;
      }
      this.http.closeLoading();
    })
  }

  // Tracking Code
  trackingCode(order : any){
    this.show(order, false);
  }

  // Add Tracking Code
  addTrackingCode(customerId:any, orderId:any){
    this.TrackingCodeForm.value.order_id = orderId;
    this.http.addTrackingCode(customerId, this.TrackingCodeForm.value, this.token).then((res)=>{
      if(res.data.error){
        this.error = res.data.message;
      }else{
        this.http.ShowSuccessMessage(res.data.message);
        this.onCloseHandled();
        setTimeout(()=>{
          window.location.reload();
        })
      }
    })
  }

  // Confirm Order Purchase
  confirm(orderId : any, customerId : any){
    this.data = [{id : orderId, total : this.total }]
    this.http.loading();
    this.http.confirmOrder(customerId, this.data, this.token).then((result)=>{
      if(result.data.error){
          this.http.ShowErrorMessage(result.data.message);
      }else{
        this.onCloseHandled();
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.getPendingOrders();
        },1500)
      }
    });
  }

  //From modal Confirmation
  declined(orderId : any, customerId : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Decline this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result)=>{
      if(result.value){
        this.declinedOrder(orderId, customerId)
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Thank You',
          'error'
        )
      }
    })
  }

  // Declin Order Purchase
  declinedOrder(orderId : any, customerId : any){
    this.data = [{
      id : orderId,
      total : this.total
    }]
    this.http.loading();
    this.http.declineOrder(customerId, this.data, this.token).then((result)=>{
      console.log(result.data);
      if(result.data.error){
        this.http.ShowErrorMessage(result.data.message);
      }else{
        this.http.ShowSuccessMessage(result.data.message);
        setTimeout(()=>{
          this.getPendingOrders();
        }, 1500);
      }
    });
  }


  openModal(order : any){
    this.show(order, true);
  }

  // Pop Up Modal
  show(order : any, first : boolean ){
    this.total = 0;
    if(first){
      this.display='block';
    }else{
      this.displayModalTracking = 'block';
    }
    this.orderId = order.id;
    this.customerId = order.customer.id;
    this.customerName = order.customer.firstname+" "+order.customer.lastname;
    this.customerOrders = order.products
    this.total = order.total;
    console.log(order);

    // Filter product sizes
    this.customerOrders = this.customerOrders.map(res => {
      const result = res.sizes.map((value : any) => {
        if(value.id === res.pivot.size_id){
          return value.size
        }
      })
      var test = result.filter((removeUndefine : any) =>{
        return removeUndefine;
      });

      res['total'] = res.pivot.quantity*res.price;
      if(result.length > 0){
        res['sizes'] = test;
      }
      return res;
    })

 }

  // Close Pop Up Modal
  onCloseHandled(){
    this.display='none';
    this.displayModalTracking = 'none';
  }

}
