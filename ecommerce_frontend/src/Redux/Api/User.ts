import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../Types/Apitypes";
import { USER } from "../../Types/Types";

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

export const {useLoginMutation} = userApi;