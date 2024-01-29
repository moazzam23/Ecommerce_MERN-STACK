import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StateResponse } from "../../Types/Apitypes";




export const DashboardApi = createApi({
    reducerPath:"DashboardApi",
    baseQuery:fetchBaseQuery( { baseUrl:`http://localhost:3000/api/v1/dashboard/`}),
    endpoints:(builder)=>({
      dashboardratio:builder.query<StateResponse,string>({
        query:(id)=>`stats?id=${id}`
      }),
      dashboardPie:builder.query<PieResponse,string>({
        query:(id)=>`pie?id=${id}`
      }),
      dashboardBar:builder.query<BarResponse,string>({
        query:(id)=>`bar?id=${id}`
      }),
      dashboardLine:builder.query<LineResponse,string>({
        query:(id)=>`line?id=${id}`
      })
    })
})
export const {useDashboardBarQuery,useDashboardPieQuery,useDashboardLineQuery,useDashboardratioQuery}= DashboardApi;