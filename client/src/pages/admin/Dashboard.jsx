import { Grid, Paper,Box, Typography, CircularProgress ,Stack,Divider,Button, Table, TableRow,TableCell, TableHead, TableBody} from '@mui/material';

import { Container } from '@mui/system';
import React,{useEffect,useState} from 'react'
import Master from './layout/Master';
import {Group,Category,HowToVote} from "@mui/icons-material"
import {useDispatch, useSelector} from 'react-redux';
import {fetch} from '../../features/dashboard/dashboardSlice';
import {fetch as categoryFetch} from '../../features/categories/categoriesSlice';


function Dashboard() {
  const dispatch = useDispatch();
  const {dashboard,success,loading,error} = useSelector((state)=>state.dashboards);
  const {categories,loading:categoriesLoading,success:categoriesSuccess} = useSelector((state)=>state.categories);
  const [selectedIndex,setSelectedIndex] = useState(0);
  useEffect(()=>{
    dispatch(categoryFetch({uri:"admin"}))
  },[]);
  useEffect(()=>{
    if(categoriesSuccess && categories.length>0){
        dispatch(fetch({id:categories[selectedIndex]._id}))
    }
  },[categoriesSuccess,categories])
  const changeWinnerList = (index)=>{
        setSelectedIndex(index)
        dispatch(fetch({id:categories[index]._id}))
  }
  console.log(dashboard)
  return (
    <Master>
        <Container sx={{margin:"1rem 0",position:"relative"}}>
           
                {
                    loading || categoriesLoading ?  <CircularProgress color="primary" sx={{position:"absolute",marginLeft:"45%",marginTop:"20%"}} /> 
                    :error ? error
                    :(
                        success && categoriesSuccess && (
                            <Stack spacing={3}>
                                  <Grid container spacing={3}>
                                <Grid item md={4}>
                                <Paper sx={{display:"flex",alignItems:"center",padding:"1rem"}}>
                                    <Box sx={{display:"flex",alignItems:"center"}}>
                                        <Group sx={{fontSize:"3rem",marginRight:".8rem"}} color="primary" />
                                        <div>
                                            <Typography variant="body1" fontWeight="bolder">Users</Typography>
                                            <Typography variant="body2" textAlign="center">{dashboard.user[0]?.count}</Typography>
                                        </div>
                                    </Box>
                                </Paper>
                                </Grid>
                                <Grid item md={4}>
                                    <Paper sx={{display:"flex",alignItems:"center",padding:"1rem"}}>
                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                            <Category sx={{fontSize:"3rem",marginRight:".8rem"}} color="primary" />
                                            <div>
                                                <Typography variant="body1" fontWeight="bolder">Category</Typography>
                                                <Typography variant="body2" textAlign="center">{dashboard.category[0]?.count}</Typography>
                                            </div>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item md={4}>
                                    <Paper sx={{display:"flex",alignItems:"center",padding:"1rem"}}>
                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                            <HowToVote sx={{fontSize:"3rem",marginRight:".8rem"}} color="primary" />
                                            <div>
                                                <Typography variant="body1" fontWeight="bolder">Voteds</Typography>
                                                <Typography variant="body2" textAlign="center">{dashboard.voteds[0]?.count}</Typography>
                                            </div>
                                        </Box>
                                    </Paper>
                                </Grid>
                                 </Grid>
                                 <Box>
                                        <Typography variant='h6' fontWeight="bolder" textAlign="center" gutterBottom>Winner Voteds</Typography>
                                        <Grid container spacing={2} marginTop=".5rem">
                                            <Grid item md={3}>
                                                    <Paper sx={{padding:"1rem",height:"350px",overflowY:"scroll",postion:"relative"}}>
                                                        <Typography variant="body1" fontWeight="bolder" textAlign="center" gutterBottom>Categories</Typography>
                                                        <Divider />
                                                         {
                                                            categories.map((c,index)=>(
                                                                <div key={c._id} style={{marginTop:"1rem"}}>
                                                                    <Button onClick={()=>changeWinnerList(index)} variant={index===selectedIndex ? "contained" :"outlined"} color="primary">{c.name}</Button>
                                                                </div>
                                                            ))
                                                         }   
                                                    </Paper>
                                            </Grid>
                                            <Grid item md={9}>
                                                    <Paper sx={{padding:"1rem",height:"350px",overflowY:"scroll",postion:"relative"}}>
                                                        <Typography variant="body1" fontWeight="bolder" textAlign="center" gutterBottom>Winner User</Typography>
                                                        <Divider />
                                                       {
                                                        dashboard.winner.length=== 0 ? (
                                                            <Typography variant="body1" textAlign="center" sx={{marginTop:"2rem"}} >No User Voted</Typography>
                                                          ) :(
                                                            <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{fontWeight:"bolder"}}>
                                                                            Roll NO
                                                                    </TableCell>
                                                                    <TableCell sx={{fontWeight:"bolder"}}>
                                                                        Name
                                                                    </TableCell>
                                                                    <TableCell sx={{fontWeight:"bolder"}}>
                                                                        VoteCount
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                           <TableBody>
                                                                {
                                                                    dashboard.winner?.map((w)=>(
                                                                        <TableRow key={w._id}>
                                                                             <TableCell>{w.rollNo}</TableCell>
                                                                             <TableCell>{w.name}</TableCell>
                                                                             <TableCell>{w.voteCount}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                           </TableBody>
                                                            </Table>
                                                          )
                                                       } 
                                                        
                                                    </Paper>    
                                            </Grid>
                                        </Grid>
                                      
                                 </Box>
                            </Stack>
                          
                        )
                   
                    )
                }
        </Container>
    </Master>
  )
}

export default Dashboard