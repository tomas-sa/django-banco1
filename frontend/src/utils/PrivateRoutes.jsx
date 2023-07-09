import { Outlet, Navigate } from "react-router-dom";


function PrivateRoutes(){
    const authenticated = false

    return(
    authenticated ? <Outlet/> : <Navigate to={'/login'}/>
    )
}

export default PrivateRoutes