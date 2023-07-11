import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import '../styles/homeStyle.css'

function HomePage() {

  let [information, setInformation ] = useState([])
  let [transactions, setTransactions ] = useState([])
  let {authTokens, logoutUser, user, toggleMenu} = useContext(AuthContext)

  useEffect(() => {
    getTransactions()
    getMoney()
  }, [])

  let getTransactions = async () => {
    let response = await fetch('http://127.0.0.1:8000/cuentas/transferencia/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if(response.status === 200){
      setTransactions(data)
      
    }else if(response.statusText ==='Unauthorized'){
      logoutUser()
    }
  }

  let getMoney = async () => {
    let response = await fetch('http://127.0.0.1:8000/cuentas/ahorros/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    if(response.status === 200){
      setInformation(data)
      
      
    }else if(response.statusText ==='Unauthorized'){
      logoutUser()
    }

  }

  return (
    <div className='home'>
      {user && <p>Hello <b>{user.username}</b></p>}
      <i onClick={toggleMenu} className="fa-solid fa-bars-staggered"></i>
      {information.length > 0 ? (
        <div className='infoAccount'>
          <p>Cuenta en <b>{information[0].moneda}</b></p>
          <div className="dineroBox">
            <h1>$ {information[0].dinero}</h1>
          </div>
        </div>
      ):
      (
        <p>loading...</p>
      )}

      <div className="opcionesBox">
        <div className="prestamosBox opBox">
          <i className="fa-solid fa-piggy-bank"></i>
          <p>Préstamos</p>
        </div>
        <Link className='link' to='/transferir'>
        <div className="transferenciasBox opBox">
          <i className="fa-solid fa-money-bill-transfer"></i>
          <p>Transferir</p>
        </div>
        </Link>
        <Link className='link' to='/nuevacuenta'>
        <div className="nuevaCuentaBox opBox">
          <i className="fa-solid fa-building-columns"></i>
          <p>Abrir cuenta</p>
        </div>
        </Link>
      </div>
      
        {transactions.map( trans => (
          
          <div key={trans.id} className="transferBox">
            <div className="infoBox">
              {trans.envio == user.username ? (
                <>
                  <p>{trans.recibio}</p>
                  <p>Transferencia recibida</p>
                </>
              ) : (
                <>
                  <p>{trans.envio}</p>
                  <p>Transferencia enviada</p>
                </>
              )}
            </div>
            <div className="moneyBox">
              <p>$ {trans.cantidad}</p>
              <p>{trans.moneda}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default HomePage