import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../Redux/Api/User";
import { UserReducer } from "../Redux/Reducers/UserReducer";
import { productApi } from "../Redux/Api/productApi";

export const Server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [UserReducer.name]: UserReducer.reducer,
},
middleware: (mid) => [...mid(),userApi.middleware,productApi.middleware]
});
