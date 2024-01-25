import { FaPlus } from "react-icons/fa";

type ProductProps={
    name:string,
    image:string,
    productId:string,
    stock:number,
    price:number,
    handler:()=>void,
}

// const server ="jfhukwhe";

const ProductCard = ({name,price,productId,stock,image}:ProductProps) => {
  return (
    <div className="productcard">
        <img src={`http://localhost:3000/${image}`} alt="" />
        {/* <img src={image} alt="" /> */}
        <p>{name}</p>
        <span>Pkr {price}</span>


        <div>
            <button> <FaPlus/></button>
        </div>
    </div>
  )
}

export default ProductCard