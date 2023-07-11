import React from 'react'
import '../styles/landingStyle.css'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
        <div className="imgContainer">
            <img className='img' src="/bankimg.png" alt="" />
        </div>
        <div className="btnContainer">
            <button className='btn signup'>Sign up</button>
            <Link to='/login'><button className='btn'>Sign in</button></Link>
        </div>
    </div>
  )
}

export default Landing