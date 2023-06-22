import React from 'react'
import {Header} from '../components/Header'
import bttopper from '../images/bt_topper.png'

export const Main = () => {
  return (
    <>
        <Header data={"Main Screen"}></Header>
        <div className='container'>
          <div className='child' style={{display:'flex', alignItems:'center' }}>
              <img id='btBanner' src={bttopper}/>
          </div>
        </div>
    </>
  )
}

