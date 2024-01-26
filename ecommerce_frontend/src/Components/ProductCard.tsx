import { FaPlus } from "react-icons/fa";
import { cartItems } from "../Types/Types";

type ProductProps={
    name:string,
    image:string,
    productID:string,
    stock:number,
    price:number,
    handler:(CartItems: cartItems) => string | undefined,
}

// const server ="jfhukwhe";

const ProductCard = ({name,price,productID,stock,image,handler}:ProductProps) => {
  return (
    <div className="productcard">
        <img src={`http://localhost:3000/${image}`} alt="" />
        {/* <img src={image} alt="" /> */}
        <p>{name}</p>
        <span>Pkr {price}</span>


        <div>
            <button onClick={()=>handler({name,price,productID,stock,image,quantity:1})}> <FaPlus/></button>
        </div>
    </div>
  )
}

export default ProductCard