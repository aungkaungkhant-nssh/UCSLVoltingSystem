import React,{useState} from 'react'
import {TextField,Box} from "@mui/material"
import PasswordField from '../PasswordField';
import {LoadingButton} from '@mui/lab';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../features/auth/userAuthSlice'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
function Register() {
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const {loading,userInfo,success} = useSelector(state=>state.userAuth);
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const handleUserRegister = (e)=>{
    e.preventDefault();
    dispatch(register({name,phone,password}));
  }
  useEffect(()=>{
    if(success) navigate("/vote");
  },[navigate,success,userInfo])
  return (
    <Box component="form" onSubmit={handleUserRegister}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <LoadingButton loading={loading} sx={{width:"100%",margin:".5rem 0"}}  type="submit" variant="contained" color="primary"  loadingPosition='center'>
            Register
        </LoadingButton>
    </Box>
  )
}

export default Register