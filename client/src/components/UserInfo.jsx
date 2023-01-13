import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { updateProfile } from "firebase/auth";

export default function UserInfo({props}) {
    const [display_Name, setDisplay_Name] = useState("")
    const [update , setUpdate] = useState("")
    const [alert, setAlert] = useState('')

    useEffect(()=>{
        setDisplay_Name(props.displayName)
    },[props])

    
    const updateUserInformation = async ()=>{
            const newUserData = {
                displayName: display_Name
            }
           await updateProfile(props,newUserData).catch((err)=>console.log(err))
        setUpdate('')
        alarm('User Updated')
    }

    const alarm = (msg)=>{
        setAlert(msg)
        setTimeout(()=>{setAlert('')},3000)
    }
    
  return (
    <div>
        <div id="toast" class={!alert ? "" : "show"}>{alert}</div>
        <p>User: {update == "yes" ? 
                            <>
                                <input 
                                    type="text" 
                                    value={display_Name}
                                    placeholder={display_Name}
                                    onChange={(e) => setDisplay_Name(e.target.value)}
                                />
                                <br/>
                            </>
                            : props.displayName
                        }
        </p>
        <p>Email: {!props.email ? "" : props.email}</p>
        <Link onClick={!update? (e)=>setUpdate("yes"):(e)=> updateUserInformation()}>Update Info</Link>
        
    </div>
  )
}

