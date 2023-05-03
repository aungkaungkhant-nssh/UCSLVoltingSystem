import { Typography,Box,List, ListItemText,ListItem,ListItemButton,ListItemIcon,Paper, CircularProgress } from '@mui/material'
import React,{useState} from 'react'
import {Label} from "@mui/icons-material"
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';


function VoteCategories({selectedIndex,loading,categories,error,setSelectedIndex}) {
  const dispatch = useDispatch();
  return (
    <Paper elevation={4} sx={{padding:"1rem",height:"100%"}}>
        <Typography variant='h6' sx={{color:"#1A2027"}} fontWeight="bold">Vote Categories</Typography>
        <List>
            {
                loading ? <div style={{width:"15%",margin:"50px auto"}}> <CircularProgress color="primary"  /></div>
                : error ? error
                : (
                    categories.length> 0 && categories.map((c,index)=>(
                        <ListItemButton
                        key={c._id}
                        selected = {selectedIndex===index}
                        onClick={()=>setSelectedIndex(index)}
                        >
                            <ListItemIcon sx={{minWidth:"30px !important"}}>
                                <Label />
                            </ListItemIcon>
                            <ListItemText primary={c.name} sx={{color:"#757575"}}/>
                        </ListItemButton>
                    ))
                )
            }
        </List>
    </Paper>
  )
}

export default VoteCategories