import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../Components/CartItems";
import { Link } from "react-router-dom";

const cartitems =[{
  productId:"sdja",
  name:"mackbook",
  image:"https://plus.unsplash.com/premium_photo-1664457233806-e1477e52e2ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BsYXNofGVufDB8fDB8fHww",
  quantity:4,
  stock:40,
  price:1200,
}];
const shippingcharges= 200;
const subtotal=4000;
const tax = Math.round(subtotal * 0.18)
const discount = 400;
const total = subtotal + tax + shippingcharges - discount;

const Cart = () => {

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
  cartitems.length > 0 ? (cartitems.map((i,idx)=>
  <CartItems
  key={idx}
  cartitems={i}
  />)):(<h1>No Item Is Added Yet</h1>)
}
     </main>
    
    <aside>
      <p>SubTotal : PKR {subtotal}</p>
      <p>Tax : PKR {tax}</p>
      <p>ShippingCharges : PKR {shippingcharges}</p>
      <p>Discount : <em>- Pkr {discount} </em></p>
      <p><b>Total</b> : PKR {total}</p>

      <input type="text" placeholder="Enter Coupon Code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
   
   {
 couponCode &&( isvalidcouponCode ?( <span className="green"> Pkr {discount} off using the <code> {couponCode} </code> </span>):(
<span className="red">Invalid Coupon Code <VscError/> </span> )) }
   {
    cartitems.length>0 &&  <Link to={"/shipping"}> CheckOut </Link>
   }
    </aside>
    </div>
  )
}

export default Cart