import { Link } from "react-router-dom"
import ProductCard from "../Components/ProductCard"


const Home = () => {

  const addtocarthandle=()=>{

  }

  return (
    <div className="home" >

      <section></section>

<h1>  Latest Products 
  <Link to={"/search"}> More</Link>
</h1>

<ProductCard 
   productId="jshajfh" name="phone" image="https://plus.unsplash.com/premium_photo-1670274606895-f2dc713f8a90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D" price={123} stock={765} handler={addtocarthandle}
/>
    </div>
  )
}

export default Home