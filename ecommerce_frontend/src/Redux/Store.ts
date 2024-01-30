import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../Redux/Api/User";
import { UserReducer } from "../Redux/Reducers/UserReducer";
import { productApi } from "../Redux/Api/productApi";
import { CartReducer } from "../Redux/Reducers/CartReducer";
import { OrderApi } from "../Redux/Api/OrderApi";
import { DashboardApi } from "../Redux/Api/DashboardApi";

export const Server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [UserReducer.name]: UserReducer.reducer,
    [CartReducer.name]: CartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userApi.middleware,
    productApi.middleware,
    OrderApi.middleware,
    DashboardApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;