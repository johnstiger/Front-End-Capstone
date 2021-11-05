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
}


export interface Data {
  id : number
}
