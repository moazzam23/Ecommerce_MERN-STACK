

import { ReactElement, useState } from "react";
import TableHOC from "../Components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";

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

    const [ row ]= useState<Datatype[]>([
        {
            _id: "83274873",
            amount:1233,
            quantity:123,
            discount:34,
            status: <span>Active</span>,
            action: <Link to={`/order/${83274873}`}>View</Link>,
            }
    ])

    const table = TableHOC<Datatype>(column,row,"dashboard-product-box","Orders")()


  return (
    <div className="container">
        <h1>My Orders</h1>
        {table}
    </div>
  )
}

export default Orders