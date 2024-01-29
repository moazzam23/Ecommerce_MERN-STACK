import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrderResponse, DeleteOrderResponse, MessageResponse, NeworderResponse, OrderResponse, UpdateOrderresponse } from "../../Types/Apitypes";


export const OrderApi = createApi({
    reducerPath:"OrderApi",
    baseQuery:fetchBaseQuery({ baseUrl:`http://localhost:3000/api/v1/order/`}),
    tagTypes: ["orders"],
    endpoints:(builder)=>({
        GetAllOrder: builder.query<AllOrderResponse,string>({
            query:(id)=> `all?id=${id}`,
            providesTags:["orders"],
        }),
        MyOrder: builder.query<AllOrderResponse,string>({
            query:(id)=> `my?id=${id}`,
            providesTags:["orders"],
        }),
        GetOrderById: builder.query<OrderResponse,string>({
            query:(id)=> `${id}`,
            providesTags:["orders"],
        }),
        createOrder: builder.mutation<MessageResponse,NeworderResponse>({
           query:(order)=>({
            url:"new",
            method:"POST",
            body:order,
        }),
        invalidatesTags:["orders"],
        }),
        UpdateOrder: builder.mutation<MessageResponse,UpdateOrderresponse>({
           query:({userId,orderId})=>({
            url:`${orderId}?id=${userId}`,
            method:"PUT",
           
        }),
        invalidatesTags:["orders"],
        }),
        DeleteOrder: builder.mutation<MessageResponse,DeleteOrderResponse>({
           query:({userId,adminId})=>({
            url:`${userId}?id=${adminId}`,
            method:"DELETE",
        }),
        invalidatesTags:["orders"],
        }),
    })
})
 
export const {useGetAllOrderQuery,useGetOrderByIdQuery,useMyOrderQuery,useCreateOrderMutation,useDeleteOrderMutation,useUpdateOrderMutation} = OrderApi;