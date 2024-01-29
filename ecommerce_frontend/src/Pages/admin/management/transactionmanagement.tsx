import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import {  useDeleteOrderMutation, useGetOrderByIdQuery, useUpdateOrderMutation } from "../../../Redux/Api/OrderApi";
import { useSelector } from "react-redux";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { ORDER, OrderItem } from "../../../Types/Types";
import { ResToast } from "../../../utils/Features";
import Skeleton from "../../../Components/Skeleton";
import { Error } from "../../../Types/Apitypes";
import toast from "react-hot-toast";


const defaultData: ORDER = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingcharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const {user}= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer);
  const params = useParams();
  const navigate = useNavigate()
  
  const{data,isError,error,isLoading}= useGetOrderByIdQuery(params.id!)
  
  if(isError) toast.error((error as Error).data.message)

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingcharges,
    }= data?.orders || defaultData;
const [ UpdateOrder]= useUpdateOrderMutation();
const [DeleteOrder] = useDeleteOrderMutation();


  const deleteHandler= async()=>{
    const res = await DeleteOrder({
      userId:data?.orders._id!,
      adminId:user?._id!,
     })
     ResToast(res,navigate,"/admin/transaction")
  }
  const updateHandler = async() => {
   const res = await UpdateOrder({
    userId:user?._id!,
    orderId:data?.orders._id!,
   })
   ResToast(res,navigate,"/admin/transaction")
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
  {isLoading ? (<Skeleton/> ):     (
    <>
    <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {orderItems.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              image={`http://localhost:3000/${i.image}`}
              productID={i.productID}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingcharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article>
        </>
        )
}
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  image,
  price,
  quantity,
  productID,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={image} alt={name} />
    <Link to={`/product/${productID}`}>{name}</Link>
    <span>
      Rs{price} X {quantity} = Rs{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
