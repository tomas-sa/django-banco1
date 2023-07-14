import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/headerStyle.css'

function Header() {
  let {user, logoutUser, toggleMenu, menuVisible, Cbu} = useContext(AuthContext)
 

  

  return (
    <div className={`header ${menuVisible ? 'visible' : 'oculto'}`}>
      <i onClick={toggleMenu} className="fa-solid fa-x"></i>
      <div className="menuHeader">
        <Link className='link' to='/home'>Home</Link>
        <span>   </span>
        {user ? (
          <p onClick={logoutUser}>Logout</p>):(
          <Link className='link' to='/login'>Login</Link>
        )}
        
        {(Cbu && user ) && <p>CBU: {Cbu}</p>}
      </div>
    </div>
  )
}

export default Header