import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import TableHOC from "../../Components/admin/TableHOC";
import { useAllUserQuery, useDeleteUserMutation } from "../../Redux/Api/User";
import { USERInitialState } from "../../Types/userreducer-Type";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import {  FaTrash } from "react-icons/fa";
import Skeleton from "../../Components/Skeleton";
import { ResToast } from "../../utils/Features";

interface DataType {
  image: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
 
  {
    Header: "Avatar",
    accessor: "image",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Customers = () => {
  const {user}= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer);
  const {data,isError,error,isLoading}= useAllUserQuery(user?._id!)
           const[deleteuser]= useDeleteUserMutation()
const navigate= useNavigate()

  const [rows, setRows] = useState<DataType[]>([]);
  if(isError) toast.error((error as Error).message)

  const DeleteHandler =async (UserId:string)=> {
    const res= await deleteuser({UserId,AdminId:user?._id!})
    ResToast(res,navigate,"/admin/customer")
 
  };
  
  useEffect(()=>{
    if (data)
    setRows(
      data.user.map((i) => ({
        image: <img src={i.image} alt="image"/>,
        name:i.name,
        email:i.email,
        gender:i.gender,
role:i.role,
        action:<button onClick={()=>DeleteHandler(i._id)} ><FaTrash color="red"  /></button>,
      }))
    );
  },[data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();



  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton/> :   Table}</main>
     
    </div>
  );
};

export default Customers;
