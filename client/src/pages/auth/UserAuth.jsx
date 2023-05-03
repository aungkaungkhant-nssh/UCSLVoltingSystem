import React,{useState} from 'react'
import {Box,Paper,Avatar,TextField,Typography} from "@mui/material"
import UCSl from '../../assets/images/ucsl.jpg';
import Register from '../../components/auth/Register';
import Login from '../../components/auth/Login';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { login } from '../../features/auth/userAuthSlice';
function UserAuth() {
  const [checkComponent,setCheckComponent] = useState(false);
  const navigate  = useNavigate();

  const dispatch = useDispatch();
  const {userInfo,loading,success} = useSelector(state =>state.userAuth);
  const handleUserLogin  =async (e,phone,password)=>{
    e.preventDefault();
    dispatch(login({phone,password}));
  }
  useEffect(()=>{
    if(success) return navigate("/vote")
  },[navigate,success,userInfo])
  useEffect(()=>{
    if(userInfo){
      navigate('/vote')
    }
  },[]);
  return (
   <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper sx={{padding:"1rem",maxWidth:"500px",width:"85%"}} elevation={4}>
            <Avatar src={UCSl} sx={{width:"100px",height:"100px",margin:"6px auto"}}/>
            <Typography textAlign="center" varaint="h5"fontWeight="bolder">
              {!checkComponent ? "Login"  : "Register"}
            </Typography>
            {
              !checkComponent ? (<Login handleLogin={handleUserLogin} loading={loading} />) : (<Register />)
            }
            <Typography textAlign="center" sx={{margin:".5rem 0 "}}>
              {
                !checkComponent ? "Don't have an account ?"  : "Already have an account"
              }
              {" "}
              {
               <span style={{color:"#cddc39",cursor:"pointer"}} onClick={()=>setCheckComponent(!checkComponent)}>{!checkComponent ? "Please Register" :"Please Login"}</span> 
              }

            </Typography>
        </Paper> 
   </Box>
  )
}

export default UserAuth