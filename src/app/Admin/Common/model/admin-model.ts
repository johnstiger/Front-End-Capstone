import { AnonymousSubject } from "rxjs/internal/Subject";

export interface Product {
  id : number,
  category_id : number,
  name : string,
  price : number,
  image : string,
  unit_measure : number,
  sizes : string,
}

export interface Customers {
  id : number,
  email : string,
  firstname : string,
  lastname : string,
  contact_number : number,
  password : string,
  addresses : any,
}


export interface Orders {
  id : number,
  total : any,
  status : any,
  payment_method : any,
  user_id : any,
  customer : any,
  products : any,
  tracking_code : any
}


export interface Data {
  id : number,
  total : number
}

export interface SalesProduct {
  id : number,
  name : any,
  percent_off : any,
  unit_measure : any,
  promo_type : any,
  size : any,
  status : any,
  total : any,
  price : any,
  products : any,
  category : any,
  description : any
}
