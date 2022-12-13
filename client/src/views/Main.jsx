import React from 'react'
import {Header} from '../components/Header'
import '../components/styles.css'
import bttopper from '../images/bt_topper.png'

export const Main = () => {
  return (
    <>
    <Header></Header>
    <div className='row'>
      <div>
          <img src={bttopper}/>
      </div>
    </div>
        
    </>
  )
}

