import React from 'react'
import {CircularProgress, Paper, Typography,Box,TablePagination,TableContainer,Button ,TableCell,Table,TableHead,TableRow, TableBody,Radio, TextField, IconButton} from '@mui/material'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {fetch, resetVotedSlice, sendVote} from '../features/voted/votedSlice';
import { useState } from 'react';
import {Search} from '@mui/icons-material';
import { userVoted } from '../features/auth/userAuthSlice';

function VoteVoteds({selectedIndex,categories}) {
 const dispatch = useDispatch();
 const {voteds,success,loading,error} = useSelector((state)=>state.voteds);
 const {userInfo} = useSelector((state)=>state.userAuth);
 const [votedId,setVotedId] = useState("");
 const [page, setPage] = React.useState(0);
 const [rowsPerPage,setrowsPerPage] = useState(10);
 const [data,setData] = useState([]);
 const [searchName,setSearchName] = useState("");

 useEffect(()=>{
    if(categories.length > 0){
      dispatch(fetch({uri:"user",categoryId:categories[selectedIndex]._id}))
    }

 },[selectedIndex,categories]);
 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
useEffect(()=>{
  if(success){
    setData(voteds);
    console.log(votedId)
    if(votedId){
     
      dispatch(userVoted({categoryId:categories[selectedIndex]._id,votedId}))
    }
  }
},[success,voteds])
const handleChangeRowsPerPage = (event) => {
  setrowsPerPage(+event.target.value);
  setPage(0);
}
  const handleSearch = (e)=>{
    if(!searchName)return setData(voteds);
    const condition = new RegExp(searchName,"i");
    let result = data.filter((e)=> condition.test(e.name));
    setData(result)
  }
  const handleChange = (e,votedId)=>{
    let isConfirm = window.confirm("Are you sure want to vote")
    if(isConfirm){
      setVotedId(e.target.value);
      dispatch(sendVote({votedId,categoryId:categories[selectedIndex]._id}));
      dispatch(resetVotedSlice())
    }
  }
  
  return (
    <Paper elevation={4} sx={{padding:"1rem",height:"100%",position:"relative"}}>
       { loading && <CircularProgress color="primary" sx={{position:"absolute",marginLeft:"45%",top:"25%"}} /> }
       {error && <p>{error}</p>} 
        {
           voteds.length > 0 && (
            <Box >
                 <Typography variant='h6' sx={{color:"#1A2027"}} fontWeight="bold" textAlign="center" gutterBottom>{voteds[0].categoryId.name}</Typography>
                  <Box sx={{display:"flex",justifyContent:{xs:"center",md:"end"},margin:"1rem 0"}}>
                      <TextField label="Search User" size='small' value={searchName} onChange={(e)=>setSearchName(e.target.value)}></TextField>
                      <Button color="primary" variant='contained' sx={{marginLeft:".5rem"}} onClick={handleSearch}><Search  /></Button>
                  </Box>
                  <TableContainer sx={{height:"310px"}}>
                    <Table aria-label="simple table">
                        <TableHead>
                          <TableRow >
                              <TableCell sx={{fontWeight:"bolder"}}>
                                  Roll NO
                              </TableCell>
                              <TableCell sx={{fontWeight:"bolder"}}>
                                  Name
                              </TableCell>
                              <TableCell sx={{fontWeight:"bolder"}}>
                                 Vote
                              </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v)=>(
                                    <TableRow key={v._id}>
                                        <TableCell>{v.rollNo}</TableCell>
                                        <TableCell>{v.name}</TableCell>
                                        <TableCell>
                                            {
                                              !userInfo.vt.find((u)=> u.categoryId===categories[selectedIndex]._id) && (
                                              
                                                    <Radio
                                                    checked={votedId === v._id}
                                                    name="vote" 
                                                    value={v._id}
                                                    onChange={(e)=>handleChange(e,v._id)}
                                                    />
                                              
                                              )
                                            }
                                         </TableCell>
                                    </TableRow>
                                  ))
                                }
                           
                        </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                      rowsPerPageOptions={[10, 20, 30]}
                      component="div"
                      count={voteds.length}
                      rowsPerPage={10}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Box>
           
         )
        }   
           
            
          
       
    </Paper>
  )
}

export default VoteVoteds