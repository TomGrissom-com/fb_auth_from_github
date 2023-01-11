import React from 'react'
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
        <a href='/Dashboard' className='reset'><img className='headerLogo' title='BetterCRM by BetterTech - Better Solutions, Better Prices, BetterTech' src={bttopper}></img></a>
        <h1 className='pageName'>{props.data}</h1>
        <a onClick={ShowMenu} className='logo menubtn'><img id='menubtn' src={menubtn}/></a>
      </div>
        <nav style={!menu ?  {right:'-100%'} : {right:'0'}} >
            <div className='container'>
                <a onClick={ShowMenu} className='logo' style={{float: 'right'}}><img id='menubtn' src={menubtnX}/></a>
                <a onClick={ShowMenu} className='logo'><img id='logo' src={bttopper}/></a>
            </div>
            <div className=''>
                {!user ? <a className='aTag_Button'href='/'>Main Screen</a> : ""}
                {!user ? <a className='aTag_Button' href='/signin'>Sign In</a> : ""}
                {!user ? <a className='aTag_Button' href='/signup'>Sign up</a> : ""}
                {!user ? "" : <a className='aTag_Button' href='/Dashboard'>Dashboard</a>}
                {!user ? "" : <a className='aTag_Button' onClick={handleLogout}>Logout</a>}
          </div>
        </nav>
    </div>
    </>
  )
}