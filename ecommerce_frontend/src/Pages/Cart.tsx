import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../Components/CartItems";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartInitialState } from "../Types/userreducer-Type";


const Cart = () => {

  const { cartItems,shippingcharges,shippinginfo,discount,tax,total,subtotal }= useSelector((state:{CartReducer:CartInitialState})=>state.CartReducer)

  const [ couponCode, setCouponCode]= useState<string>("")
  const [ isvalidcouponCode, setIsvalidcouponCode]= useState<boolean>(false)


  useEffect(()=>{

    const timeout = setTimeout(() => {
      if(Math.random() > 0.5){
setIsvalidcouponCode(true)
      }else{
setIsvalidcouponCode(false)
      }
    }, 1000);

    return()=>{
      clearTimeout(timeout)
      setIsvalidcouponCode(false)
    }

  },[couponCode])

  return (
    <div className="cart">
     <main>
{
  cartItems.length > 0 ? (cartItems.map((i,idx)=>
  <CartItems
  key={idx}
  cartitems={i}
  />)):(<h1>No Item Is Added Yet</h1>)
}
     </main>
    
    <aside>
      <p>SubTotal :{subtotal} {" "} <span style={{fontSize:"12px"}}>Rs</span></p>
      <p>Tax :{tax} {" "} <span style={{fontSize:"12px"}}>Rs</span></p>
      <p>ShippingCharges :{shippingcharges} {" "} <span style={{fontSize:"12px"}}>Rs</span></p>
      <p>Discount : <em>{discount} {" "} <span style={{fontSize:"12px"}}> -Rs</span></em></p>
      <p><b>Total</b> :{total} {" "} <span style={{fontSize:"12px"}}>Rs</span></p>

      <input type="text" placeholder="Enter Coupon Code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
   
   {
 couponCode &&( isvalidcouponCode ?( <span className="green"> Pkr {discount} off using the <code> {couponCode} </code> </span>):(
<span className="red">Invalid Coupon Code <VscError/> </span> )) }
   {
    cartItems.length>0 &&  <Link to={"/shipping"}> CheckOut </Link>
   }
    </aside>
    </div>
  )
}

export default Cart