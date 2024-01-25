import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { Auth } from "../Firebase"
import { useLoginMutation } from "../Redux/Api/User"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { MessageResponse } from "../Types/Apitypes"

const Login = () => {

    
    
    const[gender,setGender]=useState("")
    const[dob,setDob]=useState("")
    
    const [login]= useLoginMutation();
    
    const loginhandler= async()=>{
try {
    
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(Auth,provider)

const res= await login({
    name:user.displayName!,
    email:user.email!,
    role:"user",
    dob:dob,
    gender:gender,
    image:user.photoURL!,
    _id:user.uid,
})

if("data" in res){
toast.success(res.data.message);
}else{
    const error = res.error as FetchBaseQueryError;
    const message = (error.data as MessageResponse).message
    toast.error(message)
}




} catch (error) {
    toast.error("Sign In Fail, TRY AGAIN")
}
    }

  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>
            <div>
                <label>Gender</label>
<select required name="gender" value={gender}  onChange={(e)=>setGender(e.target.value)} >
    <option value=""> Select Gender </option>
    <option value="male"> Male</option>
    <option value="female"> Female</option>
</select>
</div>

<div>
    <label> Date Of Birth </label>
            <input required  onChange={(e)=>setDob(e.target.value)} type="date" name="dob" value={dob} />
            </div>
            
            <div>
<p>Already Signed In Once</p>
<button onClick={loginhandler}>
    <FcGoogle/> <span>Sign In with Google</span>
</button>
            </div>

        </main>
    </div>
  )
}

export default Login