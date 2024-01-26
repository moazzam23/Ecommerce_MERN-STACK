import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewproductRequest,
  ProductResponse,
  ProductbyidResponse,
  SerachRequest,
  SerachResponse,
  UpdateproductRequest,
} from "../../Types/Apitypes";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/v1/product`,
  }),
  //   endpoints: (builder) => ({
  //     CreateProduct: builder.mutation({
  //       query: (product) => ({
  //         url: "/createproduct",
  //         method: "POST",
  //         body: product,
  //       }),
  tagTypes:["Product"],
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse, string>({
      query: () => "latest",
      providesTags:["Product"],
    }),
    AllProduct: builder.query<ProductResponse, string>({
      query: (id) => `adminproduct?id=${id}`,
      providesTags:["Product"],
    }),
    Categories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
      providesTags:["Product"],
    }),
    SearchProduct: builder.query<SerachResponse, SerachRequest>({
      query: ({ sort, price, category, search, perpage }) => {
        let base = `allproduct?search=${search}&perpage=${perpage}`;

        if (sort) base += `&sort=${sort}`;
        if (price) base += `&price=${price}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags:["Product"],
    }),
    GetProductbyID: builder.query<ProductbyidResponse,string>({
      query: (id) => id,
      providesTags:["Product"]
    }),


    CreateProduct: builder.mutation<MessageResponse, NewproductRequest>({
      query: ({ id, formdata }) => ({
        url: `createproduct?id=${id}`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags:["Product"]
    }),
    UpdateProduct: builder.mutation<MessageResponse, UpdateproductRequest>({
      query: ({ UserId,ProductId, formdata }) => ({
        url: `${ProductId}?id=${UserId}`,
        method: "PUT",
        body: formdata,
      }),
      invalidatesTags:["Product"]
    }),
    DeleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ UserId,ProductId,  }) => ({
        url: `${ProductId}?id=${UserId}`,
        method: "DELETE",
       
      }),
      invalidatesTags:["Product"]
    }),
    // UpdateProduct: builder.mutation<MessageResponse, NewproductRequest>({
    //   query: ({ id, formdata }) => ({
    //     url: `${id}?id=${id}`,
    //     method: "Put",
    //     body: formdata,
    //   }),
    //   invalidatesTags:["Product"]
    // }),
    
  }),
});

export const {
  useLatestProductQuery,
  useAllProductQuery,
  useCreateProductMutation,
  useCategoriesQuery,
  useSearchProductQuery,
  useGetProductbyIDQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
