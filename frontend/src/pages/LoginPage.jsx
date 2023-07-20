import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/loginStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function LoginPage() {

  let {loginUser, loadingIcon} = useContext(AuthContext)
  
  return (
    <div>
      
        <Link to='/signup'>
          <button className='signupBtn'>Sign up</button>
        </Link>
        <form className='form' onSubmit={loginUser}>
            <input className='inputLogin' type="text" name='username' placeholder='Enter Username' />
            <input className='inputLogin' type="text" name='password' placeholder='Enter Password' />
            {loadingIcon ? 
            <button className='sendInput'>
                <FontAwesomeIcon className='rotate-icon' icon="fa-solid fa-spinner" />
            </button> :
            <button className='sendInput'>Enviar</button>}
            
        </form>
    </div>
  )
}

export default LoginPage