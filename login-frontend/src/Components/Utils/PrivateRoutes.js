import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const user = useSelector(state=>state.authToken.user)
   
    return (
            user  ? <Outlet /> : <Navigate to="/login" />
       
    )
}

export default PrivateRoute