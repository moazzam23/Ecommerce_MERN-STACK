
export interface USER{
    name:string,
    email:string,
    image:string,
    gender:string,
    role:string,
    dob:string,
    _id:string,
}

export type OrderItem = Omit<cartItems, "stock"> & { _id: string };

export interface ORDER{
    orderItems: OrderItem[];
  shippingInfo: shippinginfo;
  subtotal: number;
  tax: number;
  shippingcharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
}
export interface PRODUCT{
    name:string,
    category:string,
    image:string,
    stock:number,
    price:number,
    _id:string,
}

export type shippinginfo={
address:string,
city:string,
country:string
state:string
pinCode:number,
}

export type cartItems={

name:string,
image:string,
price:number,
quantity:number,
productID:string,
stock:number,
}