import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../../Types/Apitypes";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api/v1/product` }),
//   endpoints: (builder) => ({
//     CreateProduct: builder.mutation({
//       query: (product) => ({
//         url: "/createproduct",
//         method: "POST",
//         body: product,
//       }),
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse,string>({
      query: () => "latest"
    }),
    AllProduct: builder.query<ProductResponse,string>({
      query: () => "adminproduct"
    }),
  }),
});

export const  { useLatestProductQuery,useAllProductQuery } =productApi