import React from 'react'
import {Header} from '../components/Header'
import bttopper from '../images/bt_topper.png'

export const Main = () => {
  return (
    <>
        <Header></Header>
        <div className='container'>
          <div className='child'>
              <img id='btBanner' src={bttopper}/>
          </div>
        </div>
    </>
  )
}

