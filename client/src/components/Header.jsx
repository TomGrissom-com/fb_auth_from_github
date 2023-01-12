import React from 'react'
import btlogo from '../images/btlogo.png'
import bttopper from '../images/bt_topper.png'
import menubtn from '../images/Menu Button BT.png'
import menubtnX from '../images/Menu Button BT X.png'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Header(props) {
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const [menu, setMenu] = useState();

    useEffect(()=>{
      setMenu();
     },[])

        
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/');
        console.log('You are logged out')
      } catch (e) {
        console.log(e.message);
      }
    };
    
    const ShowMenu = () => {
      if(!menu){
        setMenu('true')
      }else{
        setMenu()}
      console.log(menu)
    }

  return (
    <>
    <div id='mobile_ui'>
      <div className='top'>
        <a href='/account' className='reset'><img className='headerLogo' alt='company logo' src={btlogo}></img></a>
        <h1 className='pageName'>{props.data}</h1>
        <a href='#'onClick={ShowMenu} className='logo menubtn'><img id='menubtn' alt='menu hamburger' src={menubtn}/></a>
      </div>
        <nav style={!menu ?  {right:'-100%'} : {right:'0'}} >
            <div className='container'>
                <a href='#'onClick={ShowMenu} className='logo' style={{float: 'right'}}><img id='menubtn' alt='menu closer'src={menubtnX}/></a>
                <a href='#'onClick={ShowMenu} className='logo'><img id='logo' alt="company logo in a card" src={bttopper}/></a>
            </div>
            <div className=''>
                {!user ? <a
                href='/'>Main Screen</a> : ""}
                {!user ? <a href='/signin'>Sign In</a> : ""}
                {!user ? <a href='/signup'>Sign up</a> : ""}
                {!user ? "" : <a href='/account'>Dashboard</a>}
                {!user ? "" : <a onClick={handleLogout}>Logout</a>}
          </div>
        </nav>
    </div>
    </>
  )
}