import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
  return (
    <div>
        <h3>Abrir cuenta bancaria</h3>
        <Link to='/login'> <button>Home</button> </Link>
        <form action="">
            <input type="text" placeholder='Name' />
            <input type="text" placeholder='Last name' />
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Password' />
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