import React from 'react'
import {Header} from '../components/Header'
import Contact from '../components/Contact'

export default function ContactView() {        
  return (
  <>
    <Header></Header>
    <div className='cardHolder'>
      <div className='card2'>
        <Contact></Contact>
      </div>
    </div>
  </>
  )
}
