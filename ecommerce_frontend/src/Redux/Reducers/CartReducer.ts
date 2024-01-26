import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartInitialState } from "../../Types/userreducer-Type";
import { cartItems } from "../../Types/Types";

const initialState: CartInitialState = {
  loading: false,
  cartItems: [],
  shippingcharges: 0,
  tax: 0,
  subtotal: 0,
  total: 0,
  discount: 0,
  shippinginfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: 0,
  },
};

export const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {

    AddtoCart: (state,action:PayloadAction<cartItems>)=>{
        state.loading=true;

const index= state.cartItems.findIndex((i)=>i.productID === action.payload.productID);
if(index !== -1) state.cartItems[index]= action.payload;
    else    state.cartItems.push(action.payload);
        state.loading=false

    },
    RemovetoCart: (state,action:PayloadAction<string>)=>{
        state.loading=true,
        state.cartItems =state.cartItems.filter( (i) => i.productID !== action.payload);
        state.loading=false

    },
 calculateTotal: (state)=>{
    let subtotal=state.cartItems.reduce((prev,item )=> prev + item.price*item.quantity,0)


state.subtotal=subtotal,
state.shippingcharges=state.subtotal > 1000 ? 0 :200;
state.tax=Math.round(state.subtotal*0.18)
state.total= state.subtotal+state.tax+state.shippingcharges- state.discount
 }
  },
});

export const {AddtoCart,RemovetoCart ,calculateTotal} = CartReducer.actions
