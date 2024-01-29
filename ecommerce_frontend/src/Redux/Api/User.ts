import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeleteUserRequest, GetUserResponse, MessageResponse, UserResponse } from "../../Types/Apitypes";
import { USER } from "../../Types/Types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api/v1/user` }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse,USER>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags:["users"]
    }),
    AllUser: builder.query<GetUserResponse, string>({
         query: (id) => `/all?id=${id}`,
         providesTags:["users"]
       }),
       
       
       DeleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
         query: ({ UserId,AdminId }) => ({
           url: `/${UserId}?id=${AdminId}`,
           method: "DELETE",
          
         }),
         invalidatesTags:["users"]
  }),
})
})
export const GetUser=async (id:string) => {
  try {
    const {data}:{data : UserResponse} = await axios.get( `http://localhost:3000/api/v1/user/${id}`)

    return data;

  } catch (error) {
    throw error;
  }
}

export const {useLoginMutation,useAllUserQuery,useDeleteUserMutation} = userApi;