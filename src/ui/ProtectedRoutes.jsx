import { useEffect } from 'react'
import { useUser } from "../features/Authentication/useUser"
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

function ProtectedRoutes({ children }) {
    const navigate = useNavigate()
    const { isLoading, isAuthenticated } = useUser()

    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    if(isLoading) <Spinner />

    if(isAuthenticated) return children;
}

export default ProtectedRoutes