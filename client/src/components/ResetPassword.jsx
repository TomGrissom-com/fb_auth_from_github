import React,{ useState } from 'react'
import ContactServices from '../Firebase/services'

function ResetPassword(props) {
    const [resetRes, setResetRes] = useState("")
    const [hideButton, setHideButton] = useState(false)
  
    const reset = ()=>{
        setHideButton(true)
        ContactServices.resetPassword(props.email)
            .then((res)=>{setResetRes(res)})
                .catch((err)=>{
                    if (err.code === "auth/invalid-email") {
                    setResetRes("Invalid email address.");
                  } else {
                    setResetRes("An error occurred. Please try again later.");
                  }})
        console.log(props.email)
    }
  
    return (
    <div>
        {!hideButton ? 
        <a onClick={reset}>Reset Password</a>
        :
        <p style={{color:"red"}}><strong>{resetRes}</strong></p>}
    </div>
    
  )
}

export default ResetPassword
