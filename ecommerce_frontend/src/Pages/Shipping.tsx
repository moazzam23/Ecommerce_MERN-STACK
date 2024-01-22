import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Shipping = () => {

    const navigate =  useNavigate()

    const [shippingdata,setShippingdata]=useState({
        country:"",
        city:"",
        pincode:"",
        address:"",
        state:"",
    })

    const shippinghandler = ( e : ChangeEvent<HTMLInputElement|HTMLSelectElement> )=>{

        setShippingdata(prev=> ({...prev,[e.target.name]:e.target.value}));
 
    }

  return (
    <div className="shipping">

<button className="backbtn" onClick={()=>navigate("/cart")} > <BiArrowBack/> </button>

<form>
<h1>Shipping Address</h1>
        <input required type="text" name="pincode" placeholder="Enter your Pin Code"  onChange={shippinghandler} value={shippingdata?.pincode} />
        <input required type="text" name="address" placeholder="Enter your Address" onChange={shippinghandler} value={shippingdata?.address} />
        <input required type="text" name="city" placeholder="Enter your City" onChange={shippinghandler}  value={shippingdata?.city} />
        <input required type="text" name="state" placeholder="Enter your State" onChange={shippinghandler} value={shippingdata?.state} />
       <select name="country" required value={shippingdata.country} onChange={shippinghandler}>
<option value={""}>Choose the Country</option>
<option value={"pakistan"}>Pakistan</option>
       </select>
      
        <button type="submit"> Pay Now  </button>
        </form>
    </div>
  )
}

export default Shipping