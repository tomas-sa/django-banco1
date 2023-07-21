import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/headerStyle.css'

function Header() {
  let {user, logoutUser, toggleMenu, menuVisible, Cbu} = useContext(AuthContext)
 

  

  return (
    user &&
    <div className={`header ${menuVisible ? 'visible' : 'oculto'}`}>
      <i onClick={toggleMenu} className="fa-solid fa-x"></i>
      <div className="menuHeader">
        {user && <p>Hello <b>{user.username}</b></p>}
        <Link className='link linkHome' to='/home'>Home</Link>
        <span>   </span>
        {(Cbu && user ) && <p>CBU: {Cbu}</p>}
        {user ? (
          <p onClick={logoutUser}>Logout</p>):(
          <Link className='link' to='/login'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Header