import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../Types/Apitypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type Restype =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const ResToast = (
  res: Restype,
  navigate: NavigateFunction | null ,
  url: string
) => {
    if("data" in res){
        toast.success(res.data.message);
        if(navigate) navigate(url)
        }else{
            const error = res.error as FetchBaseQueryError;
            const message = (error.data as MessageResponse).message
            toast.error(message)
        }
};


export const GetLastMonth = ()=>{

  const CurrentDate = moment()

  CurrentDate.date(1)

  const last6Month:string[] = [];
  const last12Month:string[] = [];

  for (let i = 0; i < 6; i++) {
const MonthDate= CurrentDate.clone().subtract(i,"months")
const monthname= MonthDate.format("MMMM")
last6Month.unshift(monthname)
  }
  for (let i = 0; i < 12; i++) {
const MonthDate= CurrentDate.clone().subtract(i,"months")
const monthname= MonthDate.format("MMMM")
last12Month.unshift(monthname)
  }
return  {last6Month,last12Month};
}