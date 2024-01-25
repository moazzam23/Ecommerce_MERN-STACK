import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../Types/Apitypes";
import { USER } from "../../Types/Types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/user" }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse,USER>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});


export const GetUser=async (id:string) => {
  try {
    const {data}:{data : UserResponse} = await axios.get( `http://localhost:3000/api/v1/user/${id}`)

    return data;

  } catch (error) {
    throw error;
  }
}

export const {useLoginMutation} = userApi;