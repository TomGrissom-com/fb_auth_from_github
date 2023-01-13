import React from 'react'
import ContactsService from '../Firebase/services.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";



export default function UserInfo({props}) {
    const [userData, setUserData] = useState([])
    const timestamp = new Date();
    const [First_Name, setFirst_Name] = useState("")
    const [Last_Name, setLast_Name] = useState("")
    const [update , setUpdate] = useState("")
    console.log(update)
    const User_First_Name = First_Name
    const User_Last_Name = Last_Name

    const auth = getAuth();
    const user = auth.currentUser;

    console.log(user)
    console.log(user.email)
    console.log(user.emailVerified)
    console.log(user.displayName)
    console.log(user.uid)
    
    useEffect(()=>{
        getUserInfo();
    },[props])
    
    const getUserInfo = async ()=>{
        const data = await ContactsService.getUserData(props);
        setUserData(data.data())
        setFirst_Name(data.data().User_First_Name)
        setLast_Name(data.data().User_Last_Name)
        setUpdate("")
    }

    const updateUserInformation = async (data)=>{
            const newUserData = {
                timestamp,
                User_First_Name,
                User_Last_Name
            }
            await ContactsService.updateUserData(data, newUserData)
        getUserInfo()
        setUpdate("")
    }

  return (
    <div>
        <p>Email: {!userData ? "" : userData.User_email}</p>
        <p>First Name: {!userData.User_First_Name || update ? 
                            <>
                                <input 
                                    type="text" 
                                    value={First_Name} 
                                    placeholder="Whats Your First Name?"
                                    onChange={(e) => setFirst_Name(e.target.value)}
                                />
                            </>
                            : userData.User_First_Name
                        }
        </p>
        <p>Last Name: {!userData.User_Last_Name || update ? 
                        <>
                            <input 
                                type="text" 
                                value={Last_Name} 
                                placeholder="Whats Your Last Name?"
                                onChange={(e) => setLast_Name(e.target.value)}
                                /> 
                        </>
                            : userData.User_Last_Name
                        }
        </p>
        <Link onClick={!update?(e)=>setUpdate("yes"):(e)=> updateUserInformation(userData.UID)}>Update Info</Link>
    </div>
  )
}

