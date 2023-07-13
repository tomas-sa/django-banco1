import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import '../styles/homeStyle.css'
import moment from 'moment'

function HomePage() {

  let [information, setInformation ] = useState({})
  let [transactions, setTransactions ] = useState([])
  let [monedaSeleccionada, setMonedaSeleccionada ] = useState('USD')
  let {authTokens, logoutUser, user, toggleMenu} = useContext(AuthContext)
  let [monedasDisponibles, setMonedasDisponibles] = useState([])

  useEffect(() => {
    getTransactions()
    getMoney()
  }, [monedaSeleccionada])

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

      
      let monedas = []

      data.forEach(element => {
        if(!monedas.includes(element.moneda)){
          monedas.push(element.moneda)
        }
      })

      setMonedasDisponibles(monedas)
      const filtrado = data.find((objeto) => objeto.moneda === monedaSeleccionada)
      setInformation(filtrado)
      
    }else if(response.statusText ==='Unauthorized'){
      logoutUser()
    }

  }

  let cambiarMoneda = (e) => {
    setMonedaSeleccionada(e.target.textContent)
  }

  const fechaFormater = (fecha) => {
  const fechaISO = fecha;
  const fechaFormateada = moment(fechaISO).format('DD/MM/YY');

  return <p>{fechaFormateada}</p>;
};

  return (
    <div className='home'>
      {user && <p>Hello <b>{user.username}</b></p>}
      <i onClick={toggleMenu} className="fa-solid fa-bars-staggered"></i>
      {information ? (
        <div className='infoAccount'>
          <p>Cuenta en <b>{information.moneda}</b></p>
          <div className="dineroBox">
            <h1>$ {information.dinero}</h1>
          </div>
        </div>
      ):
      (
        <p>loading...</p>
      )}

      <div className="selectMonedaBox">
        {monedasDisponibles.length > 0 ? monedasDisponibles.map(moneda => (
          <p key={moneda} onClick={cambiarMoneda}>{moneda}</p>
        )): <p>cargando</p>}
      </div>

      <div className="opcionesBox">
        <Link className='link' to='/prestamos'>
        <div className="prestamosBox opBox">
          <i className="fa-solid fa-piggy-bank"></i>
          <p>Préstamos</p>
        </div>
        </Link>
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
                  <p>Transferencia enviada</p>
                </>
              ) : (
                <>
                  <p>{trans.envio}</p>
                  <p>Transferencia recibida</p>
                </>
              )}
            </div>
            <div className="datosBox">
              <div className="moneyBox">
              <p>$ {trans.cantidad}</p>
              <p>{trans.moneda}</p>
            </div>
            <p>{fechaFormater(trans.fecha)}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default HomePage