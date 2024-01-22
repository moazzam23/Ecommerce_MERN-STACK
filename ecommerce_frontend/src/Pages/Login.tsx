import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

const Login = () => {

    const[gender,setGender]=useState("")
    const[dob,setDob]=useState("")

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
<button>
    <FcGoogle/> <span>Sign In with Google</span>
</button>
            </div>

        </main>
    </div>
  )
}

export default Login