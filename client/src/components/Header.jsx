import React from 'react'
import btlogo from '../images/btlogo.png'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export function Header() {
    const {user, logout} = UserAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          console.log('You are logged out')
        } catch (e) {
          console.log(e.message);
        }
      };

  return (
    <div className='headerContainer'>
        <div className='logo'>
            <img src={btlogo}/>
        </div>
        <div className='links column'>
            {!user ? <a href='/'>Main Screen</a> : ""}
            {!user ? <a href='/signin'>Sign In</a> : ""}
            {!user ? <a href='/signup'>Sign up</a> : ""}
            {!user ? "" : <a href='/account'>Dashboard</a>}
            {!user ? "" : <button onClick={handleLogout}>Logout</button>}
       </div>
    </div>
  )
}