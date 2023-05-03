import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function ProtectedAdminRoute({children}) {
    const {adminInfo} = useSelector(state => state.adminAuth);
    return adminInfo ? children : <Navigate to="/admin/login"/>
}

export default ProtectedAdminRoute