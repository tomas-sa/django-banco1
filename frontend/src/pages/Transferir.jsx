import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Transferir() {
    const {checkUserTransfer, userATransferir,setUserATransferir, transferir} = useContext(AuthContext)


    const handleHomeClick = () => {
    setUserATransferir(''); // O establecer en otro valor apropiado
  };

  return (
    <div>
        {userATransferir ? (
            <div className="transferirBox">
                <p>transferir a {userATransferir}</p>
                <form onSubmit={transferir}>
                    <input type="number" placeholder='$0' name='monto' />
                    <input type="submit" />
                </form>
                <Link  className='link' to='/home'>
                    <button onClick={handleHomeClick}>Home</button>
                </Link>
            </div>
        ):(
            <>
                <form onSubmit={checkUserTransfer}>
                    <input placeholder='CBU' type="text" name='cbu' />
                    <input placeholder='Moneda' type="text" name='moneda' />
                    <input className='send' type="submit"/>
                </form>
                <Link  className='link' to='/home'>
                    <button >Cancelar</button>
                </Link>
                
            </>
        )
        
        }
        
    </div>
  )
}

export default Transferir