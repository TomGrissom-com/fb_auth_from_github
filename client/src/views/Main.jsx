import React from 'react'
import {Header} from '../components/Header'
import '../components/styles.css'
import Test from '../components/Test'

export const Main = () => {
  return (
    <>
    <Header></Header>
    <div className='cardHolder'>
        <div className='card'>
            <h1>MAIN SCREEN</h1><br/><br/><br/><br/>
            <a href='/signin'>LOGIN</a><br/><br/>
            <a href='/signup'>SIGNUP</a>
        <Test></Test>
        </div>
    </div>
        
    </>
  )
}

