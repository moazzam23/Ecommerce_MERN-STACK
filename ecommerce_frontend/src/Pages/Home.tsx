import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { useLatestProductQuery } from "../Redux/Api/productApi";
import toast from "react-hot-toast";
import Skeleton from "../Components/Skeleton";
Skeleton

const Home = () => {
  const { data,isLoading, isError } = useLatestProductQuery("");

  const addtocarthandle = () => {};
if(isError) toast.error("Error Fetching The Photos")

  return (
    <div className="home">
      <section></section>

      <h2>
        Latest Products
        <Link to={"/search"} className="findmore"> More</Link>
      </h2>


      <main>
{ 
isLoading ? ( 
<Skeleton /> 
):(
  data?.product.map((i)=>
  <ProductCard
  key={i._id}
  productId={i._id}
  name={i.name}
  image={i.image}
  price={i.price}
  stock={i.stock}
  handler={addtocarthandle}
/>))  
}
</main>

    </div>
  );
};

export default Home;
