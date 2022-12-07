import React from 'react'

export function Header() {
  return (
    <div className='mainHeader'>
        <div>
            <ul>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    <a href='/signin'>Sign In</a>
                </li>
                <li>
                    <a href='/signup'>Sign up</a>
                </li>
                <li>
                    <a href='/account'>Account</a>
                </li>
            </ul>
        </div>
    </div>
  )
}