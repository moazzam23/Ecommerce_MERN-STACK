import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrderResponse, OrderResponse } from "../../Types/Apitypes";


export const OrderApi = createApi({
    reducerPath:"OrderApi",
    baseQuery:fetchBaseQuery({ baseUrl:`http://localhost:3000/api/v1/order/`}),
    endpoints:(builder)=>({
        GetAllOrder: builder.query<AllOrderResponse,string>({
            query:(id)=> `all?id=${id}`
        }),
        MyOrder: builder.query<AllOrderResponse,string>({
            query:(id)=> `my?id=${id}`
        }),
        GetOrderById: builder.query<OrderResponse,string>({
            query:(id)=> `${id}`
        }),
        createOrder: builder.mutation({
           query:(formdata)=>({
            url:"/new",
            method:"POST",
            body:formdata,
        })

        })
    })
})
 
export const {useGetAllOrderQuery,useGetOrderByIdQuery,useMyOrderQuery} = OrderApi;