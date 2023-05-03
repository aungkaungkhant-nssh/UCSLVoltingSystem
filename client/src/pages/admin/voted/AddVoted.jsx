import React, { useEffect, useState } from 'react'
import Master from '../layout/Master';
import { Container,Paper,Box,CircularProgress,Typography,IconButton,TextField,Button,  FormControl,InputLabel, MenuItem, Select } from '@mui/material';
import {List,AddCircle} from '@mui/icons-material'
import {useNavigate,useSearchParams,useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { fetch, resetCategory } from '../../../features/categories/categoriesSlice';
import { add, resetVotedSlice,get, update } from '../../../features/voted/votedSlice';
import {LoadingButton} from '@mui/lab';
function AddVoted() {
 const [name,setName] =useState("");
 const [rollNo,setRollNo]  = useState("");
 const [categoryId,setCategoryId] = useState("");
 const [searchParams, setSearchParams] = useSearchParams();
 const {categories,loading} = useSelector((state)=>state.categories);
 const {voteds,loading:addVotedLoading,success} = useSelector((state)=>state.voteds);
 const [clickedUpdate,setClickedUpdate] = useState(false);
 const params = useParams();
 const navigate = useNavigate();
 const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetch({uri:"admin"}));      
  },[])


 const handleUpdateVoted= (e)=>{
    e.preventDefault();
    setClickedUpdate(true);
    dispatch(update({id:params.id,name,rollNo,categoryId}))
 }


 const handleAddVoted =  (e)=>{
    e.preventDefault();
    dispatch(add({name,rollNo,categoryId}))
 }
 useEffect(()=>{
  setName("");
  setCategoryId("");
  setRollNo("");
  if(searchParams.get("editVoted") && params.id){
      dispatch(get({id:params.id}));
  }
},[navigate]);

 useEffect(()=>{
  if(success){
    if(searchParams.get("editVoted")){
      setName(voteds[0].name);
      setRollNo(voteds[0].rollNo);
      setCategoryId(voteds[0].categoryId._id)
      dispatch(resetVotedSlice());
      if(clickedUpdate) navigate("/admin/lists-voted")
      return;
    }
    setName("");
    setCategoryId("");
    setRollNo("");
    dispatch(resetCategory());
  }
 },[navigate,success,voteds])
  return (
    <Master>
    <Container sx={{margin:"1rem 0",height:"80%"}}>
        <Paper elevation={3} sx={{padding:"1rem",height:"100%",overflowY:"scroll"}}>
              <Box display="flex" justifyContent="space-between">
                  <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"rgba(0, 0, 0, 0.54)"}}>
                      <AddCircle  />
                      <Typography variant="subtitle1" fontWeight="bolder" marginLeft=".5rem" >
                        {searchParams.get("editVoted") ? "Update Voted" : "Add Voted"} 
                      </Typography>
                  </div>
                  <IconButton onClick={()=>navigate("/admin/lists-voted")}>
                    <List />
                  </IconButton>
              </Box>
              
              <Box component="form" onSubmit={searchParams.get("editVoted") ? handleUpdateVoted : handleAddVoted }>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      autoFocus
                      value={name}
                      onChange = {(e)=>setName(e.target.value)}
                  />
                   <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="RollNo"
                      label="Roll No"
                      value={rollNo}
                      onChange = {(e)=>setRollNo(e.target.value)}
                  />

                  <FormControl
                  fullWidth
                  sx={{margin:".8rem 0"}}>
                        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                        <Select
                            label="Category"
                            value={categoryId}
                            onChange={(e)=>setCategoryId(e.target.value)}
                            required
                           fullWidth
                        >
                            {
                                loading ? <CircularProgress color="primary" />
                                : categories.length>0 &&  categories.map((c)=><MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>)
                            }
                        </Select>
                  </FormControl>
                 
                  <LoadingButton loading={addVotedLoading}  type="submit" variant="contained" startIcon={<AddCircle />} sx={{margin:"1rem 0"}}>
                    {searchParams.get("editVoted") ? "Update Voted" : "Add Voted"} 
                  </LoadingButton>
              </Box>
             
        </Paper>
    </Container>
</Master>
  )
}

export default AddVoted