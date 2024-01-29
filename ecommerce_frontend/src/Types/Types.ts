
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
type changepercentage={
  revenue:number,
  user:number,
  product:number,
  order:number,
}

type tranctions={
  _id:string,
  status:string,
  discount:number,
  amount:number,
  quantity:number,
}


export type stats={
  CategoryCount: Record<string,number>[],
  Changepercentage:changepercentage,
  Count: changepercentage,
  chart: {
    order:number[],
    Revenue:number[],
  },
  UserRatio:{
    male:number,
    female:number,
  },
  LatestTransaction:tranctions[]

};

type Orderfullment={
  Processed:number,
  Shipped:number,
  Delivered:number,
}

type revenuecollection={
  netmargin:number,
  Discount:number,
  ProductionCost:number,
  burnt:10,
  marketingCost:30,
}

type Userage={
  teen:number,
  adult:number,
  old:number,
}

export type Piechart={
  Orderfullfillment:Orderfullment,
  CategoryCount: Record<string,number>[],
  StockAvaliability:{
    totalstock:3,
    outstock:0,
  },
  RevenueDistribution:revenuecollection,
  UserAgeGroup:Userage,
  AdminBlock:{
    admin:number,
    customer:number,
  }
}

export type Barchart={
  product:[],
  user:[],
  order:[],
}

export type linechart={
  product:[],
  discount:[],
  user:[],
  revenue:[],
}