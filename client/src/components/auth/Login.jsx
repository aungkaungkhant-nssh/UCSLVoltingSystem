import React,{useState,useEffect} from 'react'
import {TextField,Box} from "@mui/material"
import PasswordField from '../PasswordField';
import {LoadingButton} from '@mui/lab';

function Login({handleLogin,loading}) {
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  return (
    <Box component="form" onSubmit={(e)=>handleLogin(e,phone,password)}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            autoFocus
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <LoadingButton loading={loading} sx={{width:"100%",margin:".5rem 0"}}  type="submit" variant="contained" color="primary"  loadingPosition='center'>
            Login
        </LoadingButton>
    </Box>
  )
}

export default Login