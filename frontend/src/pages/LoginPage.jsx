import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/loginStyle.css'

function LoginPage() {

  let {loginUser} = useContext(AuthContext)
  return (
    <div>
        <form className='form' onSubmit={loginUser}>
            <p>Username</p>
            <input className='input' type="text" name='username' placeholder='Enter Username' />
            <p>Password</p>
            <input className='input' type="text" name='password' placeholder='Enter Password' />
            <input className='send' type="submit"/>
        </form>
    </div>
  )
}

export default LoginPage