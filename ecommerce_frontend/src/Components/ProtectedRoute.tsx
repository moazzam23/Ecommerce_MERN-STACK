import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"

interface Props{
    children?:ReactElement,
    isAuthenticated:boolean,
adminroute?:boolean,
isadmin?:boolean,
redirect?:string,

}

const ProtectedRoute = ({children,isAuthenticated,adminroute,isadmin,redirect="/"}:Props) => {
    if(!isAuthenticated) return <Navigate to={redirect} />
    if(adminroute && !isadmin) return <Navigate to={redirect} />
   
   
   
    return  children? children : <Outlet/> ;
  
  
}

export default ProtectedRoute