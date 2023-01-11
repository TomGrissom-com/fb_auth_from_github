import React from 'react'
import HOME from '../images/HOME.png'
import CONTACTS from '../images/CONTACTS.png'

function Sidebar() {
  return (
    <div className='sidebar'>
        <a href='/Dashboard'>
            <img className='icon' title='Dashboard' src={HOME}></img>
        </a>  
        <a href='/account/contacts'>
            <img className='icon' title='Contacts' src={CONTACTS}></img>
        </a>  
    </div>
  )
}

export default Sidebar
