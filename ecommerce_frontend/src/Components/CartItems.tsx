import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartItems } from "../Types/Types";

type CardProps={
    cartitems:cartItems;
    incrementhandler: (cartItems:cartItems)=>void;
    decrementhandler: (cartItems:cartItems)=>void;
    Removwhandler: (id:string)=>void;
    
}

const CartItems = ({cartitems,incrementhandler,decrementhandler,Removwhandler}:CardProps) => {

    const {image, name , quantity,price,productID} = cartitems;

  return (
    <div className="cartItems">
        <img src={`http://localhost:3000/${image}`} alt= "pic"/>

<article>
    <Link to={`/product/${productID}`}> {name} </Link>
    <span> {price} </span>
</article>

<div>
    <button onClick={()=>decrementhandler(cartitems)}>-</button>
    <p> {quantity} </p>
    <button onClick={()=>incrementhandler(cartitems)}>+</button>
</div>
    <button onClick={()=>Removwhandler(productID)} ><FaTrash/></button>

    </div>
  )
}

export default CartItems