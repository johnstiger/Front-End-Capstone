export interface Products {
  id : number,
  name : string,
  price : string,
  image : string,
  part : string,
  status : boolean,
  category_id : number
}

export interface Categories {
  id : number,
  name : string
}

export interface Comments {
  id : number,
  user_id : number,
  product_id : number,
  message : string
}

export interface Orders {
  id : number,
  user_id : number,
  total : number,
  status : boolean,
  payment_method : string
}

export interface Address {
  id : number,
  user_id : number,
  contact_number : string,
  postal_code : number,
  region : string,
  province : string,
  city : string,
  municipality : string,
  barangay : string
}
