export interface Products {
  id : number,
  name : string,
  price : string,
  image : string,
  part : string,
  status : boolean,
  description: string,
  category_id : number
}

export interface Categories {
  id : number,
  name : string,
  products : Products[]
}

export interface Users {
  id : number,
  firstname : string,
  lastname : string,
  contact_number : string,
  email : string,
  password : string,
  image : string
}

