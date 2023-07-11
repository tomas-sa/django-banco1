import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Landing from './pages/Landing'
import CajaAhorros from './pages/CajaAhorros'
import Transferir from './pages/Transferir'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider} from './context/AuthContext'
import toast, { Toaster} from 'react-hot-toast';

function App() {

  return (
    <>
        <BrowserRouter>
          <AuthProvider>
            <Header/>
            <Routes>
              <Route element={ <PrivateRoutes/>}>
                <Route element={<HomePage/>} path='/home'></Route>
                <Route element={<CajaAhorros/>} path='/nuevacuenta'></Route>
                <Route element={<Transferir/>} path='/transferir'></Route>
              </Route>
              <Route element={<Landing/>} path='/'/> 
              <Route element={<LoginPage/>} path='/login'/> 
            </Routes>
          </AuthProvider>
          <Toaster
        position='top-center'
        toastOptions={{
            style:{
                fontSize: '1rem',
                fontWeight: '500'
            }
        }}/>
        </BrowserRouter>
    </>
  )
}

export default App
