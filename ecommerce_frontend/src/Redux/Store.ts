import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../Redux/Api/User";
import { UserReducer } from "../Redux/Reducers/UserReducer";
import { productApi } from "../Redux/Api/productApi";
import { CartReducer } from "./Reducers/CartReducer";

export const Server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [UserReducer.name]: UserReducer.reducer,
    [CartReducer.name]: CartReducer.reducer,
},
middleware: (mid) => [...mid(),userApi.middleware,productApi.middleware]
});
