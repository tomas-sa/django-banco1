import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import '../styles/homeStyle.css'
import Transactions from '../components/Transactions'

function HomePage() {

  let [information, setInformation ] = useState({})
  let [monedaSeleccionada, setMonedaSeleccionada ] = useState('USD')
  let [primerCarga, setPrimerCarga ] = useState(true)
  let {authTokens, logoutUser, user, setCbu} = useContext(AuthContext)
  let [monedasDisponibles, setMonedasDisponibles] = useState([])

  useEffect(() => {
    getMoney()
  }, [monedaSeleccionada])



  let getMoney = async () => {
    try{
      let response = await fetch('https://drfbank.onrender.com/cuentas/ahorros/',{
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
      
      if(primerCarga){
        setInformation(data[0])
        setPrimerCarga(false)
        setCbu(data[0].user)
      }else{
        const filtrado = data.find((objeto) => objeto.moneda === monedaSeleccionada)
        setInformation(filtrado)
      }
      

      
      
      
    }else if(response.statusText ==='Unauthorized'){
      logoutUser()
    }
    }catch(error){
      console.log(error);
    }
    

  }

  let cambiarMoneda = (e) => {
    setMonedaSeleccionada(e.target.textContent)
  }

  return (
    <div className='home'>
      <div className="homeInter">
        <div className="hello">
          {user && <p className='hello'>Hello <b>{user.username}</b></p>}
        </div>
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
        {monedasDisponibles.length > 0 && monedasDisponibles.map(moneda => (
          <p className={moneda === information.moneda &&`selectedCur`} key={moneda} onClick={cambiarMoneda}>{moneda}</p>
        ))}
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
      </div>
      
      <div className="transactionsComponent">
        <Transactions/>
      </div>
    </div>
  )
}

export default HomePage