import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../Redux/Api/User";
import { UserReducer } from "../Redux/Reducers/UserReducer";

export const Server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [UserReducer.name]: UserReducer.reducer,
},
// middleware: (mid) => [...mid(),userApi.middleware,]
});
