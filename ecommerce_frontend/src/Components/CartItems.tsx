import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CardProps={
    cartitems:any;
    
}

const CartItems = ({cartitems}:CardProps) => {

    const {image, name , quantity,price,productId} = cartitems;

  return (
    <div className="cartItems">
        <img src={image} alt= "pic"/>

<article>
    <Link to={`/product/${productId}`}> {name} </Link>
    <span> {price} </span>
</article>

<div>
    <button>-</button>
    <p> {quantity} </p>
    <button>+</button>
</div>
    <button><FaTrash/></button>

    </div>
  )
}

export default CartItems