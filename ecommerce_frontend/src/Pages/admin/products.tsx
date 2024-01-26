import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import TableHOC from "../../Components/admin/TableHOC";
import { useAllProductQuery } from "../../Redux/Api/productApi";
import toast from "react-hot-toast";
import { Error } from "../../Types/Apitypes";
import { useSelector } from "react-redux";
import { USERInitialState } from "../../Types/userreducer-Type";
import Skeleton from "../../Components/Skeleton";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Products = () => {
  const {user}= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)
  const { isLoading,isError,error, data } = useAllProductQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);
if(isError) toast.error((error as Error).data.message)

useEffect(()=>{
  if (data)
  setRows(
    data.product.map((i) => ({
      photo: <img src={`http://localhost:3000/${i.image}`} alt="image"/>,
      name:i.name,
      price:i.price,
      stock:i.stock,
      action:<Link to={`/admin/product/${i._id}`}>Manage</Link>,
    }))
  );
},[data])



  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{ isLoading ? <Skeleton/> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
