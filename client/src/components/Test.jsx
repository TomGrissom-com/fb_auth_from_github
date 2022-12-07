import { useState, useEffect } from "react"
import React from 'react'

function Test() {
  const [users , setUsers]= useState([])


useEffect(()=>{
     fetch("/api").then(res => res.json()).then(data=>{setUsers(data)})
},[])


    return (
    <div>
        <h1>test</h1>
        {(typeof users.users === "undefined") ? (<p>Loading...</p>):(users.users.map((user, i)=>(<p key={i}>{user}</p>)))}
        
    </div>
  )
}

export default Test