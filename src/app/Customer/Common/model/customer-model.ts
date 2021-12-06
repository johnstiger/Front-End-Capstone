export interface Products {
  id : number,
  name : string,
  price : string,
  image : string,
  part : string,
  status : boolean,
  category_id : number,
  description : any,
  sizes : any,
  unit_measure : number,
  category : any,
  percent_off : any,
  total_avail_unit_measure : any,
  end : any,
  first : any,
  availableSize : any,
  over_all_total : any
}

export interface Admins {
  id : number,
  email : string,
  firstname : string,
  lastname : string,
  contact_number : number,
  password : string,
  image : string
}

export interface Categories {
  id : number,
  name : string
}

export interface Sizes {
  id : number,
  size : string,
  pivot : any
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
  payment_method : string,
  customer : any,
  products : any,
  price : any,
  created_at : any,
  overAllTotal : any
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

export interface Size {
  id : number,
  product_id : number,
  size: string,
  unit_measure : number,
  price : number
}
