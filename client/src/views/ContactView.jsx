import React from 'react'
import {Header} from '../components/Header'
import Contact from '../components/Contact'
import Sidebar from '../components/Sidebar';

export default function ContactView() {        
  return (
  <>
    <Header data={"Contact"}></Header>
    <Sidebar/>
    <div className='main_content'>
      <div className='cardHolder'>
        <div className='card2'>
          <Contact></Contact>
        </div>
      </div>
    </div>
  </>
  )
}
