

import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../Components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useMyOrderQuery } from "../Redux/Api/OrderApi";
import { USERInitialState } from "../Types/userreducer-Type";
import { useSelector } from "react-redux";
import { Error } from "../Types/Apitypes";
import toast from "react-hot-toast";
import Skeleton from "../Components/Skeleton";

type Datatype={
_id: string;
amount:number;
quantity:number;
discount:number;
status:ReactElement;
action: ReactElement;
}

const column  : Column<Datatype>[]=[
    {
    Header:"ID",
    accessor:"_id",
},
    {
    Header:"Quantity",
    accessor:"quantity",
},
    {
    Header:"Discount",
    accessor:"discount",
},
    {
    Header:"Amount",
    accessor:"amount",
},
    {
    Header:"Status",
    accessor:"status",
},
    {
    Header:"Action",
    accessor:"action",
},
]

const Orders = () => {
    const {user}= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer);
    const {data,isError,error ,isLoading} = useMyOrderQuery(user?._id!)
    
    if(isError) toast.error((error as Error).data.message)



    const [ row,setRow ]= useState<Datatype[]>([])
    useEffect(()=>{
        if (data)
        setRow(
          data.orders.map((i) => ({
            _id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
            status: (
              <span
                className={
                  i.status === "Processing"
                    ? "red"
                    : i.status === "Shipped"
                    ? "green"
                    : "purple"
                }
              >
                {i.status}
              </span>
            ),
            action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
          }))
        );
      },[data])

    const table = TableHOC<Datatype>(column,row,"dashboard-product-box","Orders")()


  return (
    <div className="container">
        <h1>My Orders</h1>
        { isLoading ? <Skeleton/> : table}
    </div>
  )
}

export default Orders