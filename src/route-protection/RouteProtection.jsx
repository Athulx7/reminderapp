import React from 'react'
import { Navigate } from 'react-router-dom'

function RouteProtection({children} ) {
    const user = sessionStorage.getItem('logeduser')
    const token = sessionStorage.getItem('token')

    if(!user || !token){
        return <Navigate to={'/'} replace />
    }
  return (
  <>
    {children}
  </>
  )
}

export default RouteProtection
