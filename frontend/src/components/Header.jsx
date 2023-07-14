import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/headerStyle.css'

function Header() {
  let {user, logoutUser, toggleMenu, menuVisible, Cbu} = useContext(AuthContext)
 

  

  return (
    <div className={`header ${menuVisible ? 'visible' : 'oculto'}`}>
        <Link className='link' to='/home'>Home</Link>
        <span>   </span>
        {user ? (
          <p onClick={logoutUser}>Logout</p>):(
          <Link className='link' to='/login'>Login</Link>
        )}
        <i onClick={toggleMenu} className="fa-solid fa-x"></i>
        {(Cbu && user ) && <p>CBU: {Cbu}</p>}
        
    </div>
  )
}

export default Header