import React,{useState,useEffect} from 'react'
import {Box,Paper,Avatar,TextField,Typography} from "@mui/material"
import UCSl from '../../assets/images/ucsl.jpg';
import Login from '../../components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { login } from '../../features/auth/adminAuthSlice';
function UserAuth() {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const {adminInfo,success,loading} = useSelector((state)=>state.adminAuth);
  const handleAdminLogin  =async (e,phone,password)=>{
    e.preventDefault();
    dispatch(login({phone,password}))
  }
  useEffect(()=>{
    if(success) return navigate("/admin/dashboard")
  },[navigate,success,adminInfo])

  useEffect(()=>{
    if(adminInfo){
      navigate('/admin/dashboard')
    }
  },[]);
  return (
   <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper sx={{padding:"1rem",width:"500px",maxWidth:"90%"}} elevation={4}>
            <Avatar src={UCSl} sx={{width:"100px",height:"100px",margin:"6px auto"}}/>
            <Typography textAlign="center" varaint="h5"fontWeight="bolder">
              Admin Login
            </Typography>
            <Login  handleLogin={handleAdminLogin} loading={loading} />
        </Paper> 
   </Box>
  )
}

export default UserAuth