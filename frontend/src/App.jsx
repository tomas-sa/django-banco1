import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider} from './context/AuthContext'

function App() {

  return (
    <>
        <BrowserRouter>
          <AuthProvider>
            <Header/>
            <Routes>
              <Route element={ <PrivateRoutes/>}>
                <Route element={<HomePage/>} path='/'></Route>
              </Route>
              <Route element={<LoginPage/>} path='/login'/> 
            </Routes>
          </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
