import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Transferir() {
    const {checkUserTransfer, userATransferir, transferir} = useContext(AuthContext)

  return (
    <div>
        {userATransferir ? (
            <div className="transferirBox">
                <p>transferir a {userATransferir}</p>
                <form onSubmit={transferir}>
                    <input type="number" placeholder='$0' name='monto' />
                    <input type="submit" />
                </form>
            </div>
        ):(
        <form onSubmit={checkUserTransfer}>
            <input placeholder='CBU' type="text" name='cbu' />
            <input placeholder='Moneda' type="text" name='moneda' />
           <input className='send' type="submit"/>
        </form>)
        }
    </div>
  )
}

export default Transferir