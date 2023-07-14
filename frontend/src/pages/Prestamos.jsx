import React from 'react'
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';

function Prestamos() {

  let {authTokens} = useContext(AuthContext)
  const [prestamos, setPrestamos] = useState([])
  const [seleccionado, setSeleccionado] = useState([])
  const [monedas, setMonedas] = useState([])
  const navigate = useNavigate()

  const notifyError = () => toast.error('no puedes pedir esa cantidad');
  const notifySuccess = () => toast.success('prestamo concedido');

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
    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/cuentas/prestamos/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({'monto':parseInt(e.target.monto.value), 'moneda':seleccionado.moneda})
    })
    let data = await response.json()
    if(response.status == 405){
      notifyError()
    }else{
      notifySuccess()
      navigate('/home')
    }
    
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
      
      <form onSubmit={postPrestamos}>
        <input type="number" placeholder='$0' name='monto'/>
        <input type="submit"/>
      </form>
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default Prestamos