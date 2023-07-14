import React from 'react'
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

function Prestamos() {

  let {authTokens} = useContext(AuthContext)
  const [prestamos, setPrestamos] = useState([])
  const [seleccionado, setSeleccionado] = useState([])
  const [monedas, setMonedas] = useState([])

  useEffect(()=>{
    getPrestamos()
  },[])

  function cambiarMoneda(e){
    const filtrado = prestamos.filter(obj =>{
      return obj.moneda === e.target.textContent
    })
    if(filtrado.length > 0){
      setSeleccionado(filtrado[0])
    }
  }
  function cambiarMonedaHandler(e){
    cambiarMoneda(e)
  }

  let postPrestamos = async (e) => {
    let response = await fetch('http://127.0.0.1:8000/cuentas/prestamos/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({'monto':e.target.username.value, 'moneda':e.target.username.value})
    })
    let data = await response.json()
  }

  let getPrestamos = async () =>{
    let response = await fetch('http://127.0.0.1:8000/cuentas/prestamos/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setPrestamos(data)
    data.map( x =>{
      if(!monedas.includes(x.moneda)){
        monedas.push(x.moneda)
      }
    })
    setSeleccionado(data[0])
  }

  return (
    <div>
      <h3>Prestamo disponible</h3>
      {seleccionado && <p>Moneda: {seleccionado.moneda}</p>}
      {seleccionado && <p>$ {seleccionado.prestamo}</p>}
      <div className="selectCurr">
        {monedas.length > 0 && monedas.map(x =>(
          <p key={x} onClick={cambiarMonedaHandler} name={x}>{x}</p>
        ))}
      </div>
      
      <form action="">
        <input type="number" placeholder='$0' name='prestamoForm'/>
        <input type="submit" name="" id="" />
      </form>
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default Prestamos