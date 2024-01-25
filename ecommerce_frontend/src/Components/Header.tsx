import { useState } from "react"
import { FaCartPlus, FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { USER } from "../Types/Types"
import { signOut } from "firebase/auth";
import { Auth } from "../Firebase";
import toast from "react-hot-toast";


interface propstype{
    user:USER | null;
}

const Header = ({user} : propstype) => {
    const [isopen,setIsopen]=useState(false)

    const logouthandler=async()=>{

        try {
            
            await signOut(Auth)
            toast.success("LogOut Successfully")

            setIsopen(false)
        } catch (error) {
            toast.error("LogOut Fail")
        }
    }


  return (
    <nav className="header">
        <Link onClick={()=>setIsopen(false)} to={"/"}>Home</Link>
        <Link onClick={()=>setIsopen(false)} to={"/search"}><FaSearch/> </Link>
        <Link onClick={()=>setIsopen(false)} to={"/cart"}><FaCartPlus/></Link>
{
    user?._id? (
        <>
        <button onClick={()=>setIsopen((prev)=>!prev)} >
            <FaUser/>
        </button>
        <dialog open={isopen} >
            <div>
                {
                    user?.role ==="admin"&&(
                        <Link onClick={()=>setIsopen(false)} to={"/admin/dashboard"}>Admin</Link>
                    )}

                    <Link  onClick={()=>setIsopen(false)} to={"/orders"}>Orders</Link>
                    <button onClick={logouthandler} ><FaSignOutAlt/></button>
            </div>
        </dialog>
        </>
    ):(
        <Link to={"/login"}><FaSignInAlt/></Link>
    )
}
        
    </nav>
  )
}

export default Header