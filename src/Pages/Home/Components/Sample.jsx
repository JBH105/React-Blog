import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Sample = () => {

        const [authemail , setAuthEmail] = useState("")
        const history = useHistory("")

        const location = useLocation()
        console.log(location.state)
        
        useEffect(()=>{
            setAuthEmail(location.state)
        })
        localStorage.setItem("email" , authemail)
        console.log(localStorage.getItem("email"))
        
        function logout(){
        localStorage.clear()
        history.push("/Profile")
        }
    return (
        <div>
            this is the sample
            <button onClick={()=>logout()}>Logout</button>
        </div>
    )
}

export default Sample
