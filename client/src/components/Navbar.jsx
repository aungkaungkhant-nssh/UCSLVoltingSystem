import React,{useState} from 'react'
import {AppBar,Toolbar,Typography,Box,Avatar,Menu, MenuItem, ListItemIcon,IconButton,Divider} from '@mui/material'
import {Logout, School,AccountCircle} from "@mui/icons-material"
import {useSelector} from 'react-redux';
import { avatarName } from '../util/avatar';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { logout } from '../features/auth/userAuthSlice';
function Navbar() {
  const [anchorEl,setanchorEl] = useState(null);
  const {userInfo} = useSelector((state)=>state.userAuth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (e)=>{
    setanchorEl(e.currentTarget);
  }
  const userLogout = ()=>{
    localStorage.removeItem("userInfo");
    dispatch(logout());
    navigate('/')
  }
  return (
    <AppBar position='static' color="primary">
        <Toolbar >
                <School sx={{fontSize:"2.5rem",marginRight:".8rem"}}/>
                <Typography variant="h6" sx={{flexGrow:"1",fontFamily:"monospace",fontWeight: 700}} fontSize={{md:18,xs:13}}>
                    UCSL(Online Volting System)
                </Typography>
              
                <Box>
                    <IconButton
                      onClick={handleClick}
                    >
                        <Avatar>{avatarName(userInfo.name)}</Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={()=>setanchorEl(null)}
                      onClick={()=>setanchorEl(null)}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            {userInfo.name}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={userLogout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar