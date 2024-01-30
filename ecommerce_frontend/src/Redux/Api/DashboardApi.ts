import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StateResponse } from "../../Types/Apitypes";




export const DashboardApi = createApi({
    reducerPath:"DashboardApi",
    baseQuery:fetchBaseQuery( { baseUrl:`http://localhost:3000/api/v1/dashboard`}),
    endpoints:(builder)=>({
      dashboardratio:builder.query<StateResponse,string>({
        query:(id)=>`/stats?id=${id}`,
        keepUnusedDataFor:0,
      }),
      dashboardPie:builder.query<PieResponse,string>({
        query:(id)=>`/pie?id=${id}`,
        keepUnusedDataFor:0,

      }),
      dashboardBar:builder.query<BarResponse,string>({
        query:(id)=>`/bar?id=${id}`,
        keepUnusedDataFor:0,
      }),
      dashboardLine:builder.query<LineResponse,string>({
        query:(id)=>`/line?id=${id}`,    
          keepUnusedDataFor:0,
      })
    })
})
export const {useDashboardBarQuery,useDashboardPieQuery,useDashboardLineQuery,useDashboardratioQuery}= DashboardApi;