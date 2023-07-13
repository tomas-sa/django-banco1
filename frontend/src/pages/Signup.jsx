import React from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';


function Signup() {

  const notifyError = () => toast.error('algo salio mal');
  const notifySuccess = () => toast.success('cuenta creada con exito');
  const navigate = useNavigate()

  let crearCuenta = async (e) => {
    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/cuentas/createuser/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({'username':e.target.username.value,
       'first_name':e.target.first_name.value,
       'last_name':e.target.last_name.value,
       'email':e.target.email.value,
       'password':e.target.password.value,
       'moneda':e.target.currency.value
      })
    })
    let data = await response.json()
    if(data.error){
            notifyError()
    }else{
            notifySuccess()
            navigate('/')
        }
  }


  return (
    <div>
        <h3>Abrir cuenta bancaria</h3>
        <Link to='/login'> <button>Home</button> </Link>
        <form onSubmit={crearCuenta}>
            <input name='first_name' type="text" placeholder='Name' />
            <input name='username' type="text" placeholder='username' />
            <input name='last_name' type="text" placeholder='Last name' />
            <input name='email' type="text" placeholder='Email' />
            <input name='password' type="text" placeholder='Password' />
            <select name="currency" id="selected_currency">
                <option value="">-select currency-</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
            </select>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default Signup