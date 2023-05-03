import React,{useState} from 'react'
import {TextField,InputAdornment,IconButton} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';

function PasswordField({password,setPassword}) {
  const [visibility,setVisibility] = useState(false);
  return (
    <TextField
        margin="normal"
        required
        fullWidth
        type={visibility?"text":"password"}
        label="Password"
        value={password}
        onChange = {(e)=>setPassword(e.target.value)}
        InputProps={{
        endAdornment: <InputAdornment position='end'>
            <IconButton
            onClick={()=>setVisibility(!visibility)}
            >
               {visibility ? <VisibilityOff color="primary" />  : <Visibility color="primary" />  } 
            </IconButton>
        </InputAdornment>
        }}     
     />
  )
}

export default PasswordField