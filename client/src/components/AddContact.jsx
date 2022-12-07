import React, { useState } from "react";
import ContactServices from '../Firebase/services'
import { UserAuth } from '../context/AuthContext';

export function AddContact(){
    const [email, setEmail]= useState('')
    const [first_name, setFirst_name]= useState('')
    const [last_name, setLast_name]= useState('')
    const [phone_number01, setPhone_number01]= useState('')
    const [phone_number02, setPhone_number02]= useState('')
    const {user}= UserAuth()
    const uid = user.uid
    const timestamp = new Date();
    console.log("keystroke logged at "+timestamp)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newdata = {
            email,
            first_name,
            last_name,
            phone_number01,
            phone_number02,
            timestamp,
            uid,
        }
        await ContactServices.addData(newdata)
        setEmail('')
        setFirst_name('')
        setLast_name('')
        setPhone_number01('')
        setPhone_number02('')
        window.location.reload(false)
    }

    return(<>
        <div>
            <h2>Add Contact</h2>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                   

                    <input 
                        type="text" 
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}>
                    </input><br/>
                    
                    <input 
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}>
                    </input><br/>
                   
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input><br/>
                    
                    <input 
                        type="text"
                        placeholder="Main Phone"
                        value={phone_number01}
                        onChange={(e) => setPhone_number01(e.target.value)}>
                    </input><br/>
                   
                    <input 
                        type="text"
                        placeholder="Secondary Phone"
                        value={phone_number02}
                        onChange={(e) => setPhone_number02(e.target.value)}>
                    </input><br/>
                                      
                    <input type="submit" value="Submit"></input>
                    
                    </form>
                </div>
            </div>
        </div>
    </>)
}