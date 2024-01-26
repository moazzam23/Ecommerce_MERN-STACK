import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../Types/Apitypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

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
