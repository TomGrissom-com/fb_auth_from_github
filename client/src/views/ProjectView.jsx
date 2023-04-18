import React from 'react'
import {Header} from '../components/Header'
import Project from '../components/Project'
import Sidebar from '../components/Sidebar';

export default function ContactView() {        
  return (
  <>
    <Header data={"Project"}></Header>
    <Sidebar/>
    <div className='main_content'>
      <div className='cardHolder'>
        <div className='card2'>
          <Project></Project>
        </div>
      </div>
    </div>
  </>
  )
}
