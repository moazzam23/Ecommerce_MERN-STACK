import {USER, cartItems, shippinginfo} from "./Types";

export interface USERInitialState{
    user: USER |null,
    loading:boolean,
};


export interface CartInitialState{
    loading:boolean,
    cartItems:  cartItems[],
    shippingcharges:number,
    tax:number,
    subtotal:number,
    total:number,
    discount:number,
    shippinginfo:shippinginfo,
};