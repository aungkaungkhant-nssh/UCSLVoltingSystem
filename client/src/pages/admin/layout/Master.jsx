import React from 'react'
import {Avatar,AppBar,Toolbar,Button,Box,Drawer,List, ListItemButton, ListItemIcon, ListItemText, Typography,Collapse, Divider} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux';
import Vote from '../../../assets/images/vote.jpg'
import {ExpandLess,School,HowToVote,ExpandMore,Category,List as ListIcon,Dashboard as DashboardIcon,AddCircle,Logout} from "@mui/icons-material"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/adminAuthSlice';

function Master({children}) {
  const navigate = useNavigate();
  const {adminInfo} = useSelector((state)=>state.adminAuth);
  const dispatch = useDispatch();
  const [openCollapseCategory,setOpenCollapseCategory] = useState(false);
  const [openCollapseVoted,setOpenCollapseVoted] = useState(false);
  const adminLogout = ()=>{
    localStorage.removeItem("adminInfo");
    dispatch(logout());
    navigate('/admin/login')
  }
  return (
    <Box sx={{display:"flex",height:"100vh"}}>
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - 240px)`, ml: `240px` }}
            >
            <Toolbar>
                <School sx={{fontSize:"2.5rem",marginRight:".8rem"}}/>
                <Typography variant="h6" noWrap component="div" sx={{fontFamily:"monospace",fontWeight: 700}} fontSize={{md:18,xs:13}}>
                  UCSL(Online Volting System)
              </Typography>
            </Toolbar>
          </AppBar>
           <Drawer
            variant='permanent'
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
              positon:"relative"
            }}
          >
              <Avatar sx={{width:"120px",height:"120px",margin:"1rem auto"}} src={Vote}/>
              <Typography variant="h6" textAlign="center" sx={{fontFamily:"monospace",fontWeight: 700}} gutterBottom>{adminInfo.name}</Typography>
              <Divider />
              <List>
                  <ListItemButton onClick={()=>navigate("/admin/dashboard")}>
                      <ListItemIcon>
                          <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard"/>
                  
                  </ListItemButton>
                  <ListItemButton onClick={()=>setOpenCollapseCategory(!openCollapseCategory)}>
                      <ListItemIcon>
                          <Category />
                      </ListItemIcon>
                       <ListItemText primary="Category" />
                       {openCollapseCategory ? <ExpandLess /> : <ExpandMore />}
                   </ListItemButton>
                  <Collapse in={openCollapseCategory} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate('/admin/add-category')}>
                            <ListItemIcon>
                                <AddCircle />
                            </ListItemIcon>
                            <ListItemText primary="Add Category" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/admin/lists-category')}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Category Lists" />
                          </ListItemButton>
                         
                    </List>
                  </Collapse>

                  <ListItemButton onClick={()=>setOpenCollapseVoted(!openCollapseVoted)}>
                      <ListItemIcon>
                          <HowToVote />
                      </ListItemIcon>
                       <ListItemText primary="Voted" />
                       {openCollapseCategory ? <ExpandLess /> : <ExpandMore />}
                   </ListItemButton>
                  <Collapse in={openCollapseVoted} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate('/admin/add-voted')}>
                            <ListItemIcon>
                                <AddCircle />
                            </ListItemIcon>
                            <ListItemText primary="Add Voted" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/admin/lists-voted')}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Voted Lists" />
                          </ListItemButton>
                         
                    </List>
                  </Collapse>
              </List>
              <Button onClick={adminLogout} sx={{position:"absolute",bottom:"10px",left:"30%"}} variant="contained" color="primary" size="small" endIcon={<Logout />}>Logout</Button>
          </Drawer>
          <Box component="main" sx={{flexGrow:1}}>
                <Toolbar />
                {children}     
          </Box> 
       
    </Box>
  )
}

export default Master