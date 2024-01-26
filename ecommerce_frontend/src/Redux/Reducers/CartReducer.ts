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
        state.loading=true,
        state.cartItems.push(action.payload);
        state.loading=false

    },
    RemovetoCart: (state,action:PayloadAction<string>)=>{
        state.loading=true,
        state.cartItems =state.cartItems.filter( (i) => i.productID !== action.payload);
        state.loading=false

    }

  },
});

export const {AddtoCart,RemovetoCart} = CartReducer.actions
