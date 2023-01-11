import React, { useState } from "react";
import ContactServices from '../Firebase/services'
import { UserAuth } from '../context/AuthContext';

export function AddContact(){
    const [email, setEmail]= useState('')
    const [first_name, setFirst_name]= useState('')
    const [last_name, setLast_name]= useState('')
    const [phone_number01, setPhone_number01]= useState('')
    const [phone_number02, setPhone_number02]= useState('')
    const [loading, setLoading] = useState('')
    const [err, setErr] = useState('')
    const {user}= UserAuth()
    const uid = user.uid
    const timestamp = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Loading")
        setErr('')
        
        const newdata = {
            email,
            first_name,
            last_name,
            phone_number01,
            phone_number02,
            timestamp,
            uid,
        }
        
        if(!first_name || !last_name){
            setErr("MUST HAVE FIRST AND LAST NAME")
        }else{
            try {
                await ContactServices.addData(newdata);
            } catch (e) {
                setErr(e.message);
            } 
            setEmail('')
            setFirst_name('')
            setLast_name('')
            setPhone_number01('')
            setPhone_number02('')
            setErr('')
            window.location.reload(false)
        }
        
        setLoading('')

    }

    return(<>
        <div className="card_plain p8">
            <div className="">
                <h2>Add Contact</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="m5 p5 border_rounded" 
                        type="text" 
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        disabled={!loading ? "":"disabled"}>
                    </input>
                    <input 
                        className="m5 p5 border_rounded"
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        disabled={!loading ? "":"disabled"}>
                    </input><br/>
                    <input 
                        className="m5 p5 border_rounded"
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!loading ? "":"disabled"}>
                    </input>
                    <input 
                        className="m5 p5 border_rounded"
                        type="text"
                        placeholder="Main Phone"
                        value={phone_number01}
                        onChange={(e) => setPhone_number01(e.target.value)}
                        disabled={!loading ? "":"disabled"}>
                    </input><br/>
                    <input 
                        className="m5 p5 border_rounded"
                        type="text"
                        placeholder="Secondary Phone"
                        value={phone_number02}
                        onChange={(e) => setPhone_number02(e.target.value)}
                        disabled={!loading ? "":"disabled"}>
                    </input>   
                    <input className="m5 p5 border_rounded" type="submit" value="Submit" disabled={!loading ? "":"disabled"}></input>
                </form>
                {!err ? '':<a className="txtRED">{err}</a>}
            </div>
        </div>
    </>)
}