import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function ProtectedUserRoute({children}) {
  const {userInfo} = useSelector(state => state.userAuth);
  return userInfo ? children : <Navigate to="/"/>
}

export default ProtectedUserRoute