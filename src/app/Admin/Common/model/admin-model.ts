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
  password : string
}
