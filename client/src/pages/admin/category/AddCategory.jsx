import React,{useState,useEffect} from 'react'
import Master from '../layout/Master.jsx'
import  { TextField,Container,Box, Typography, Paper, IconButton,Button } from '@mui/material';
import {AddCircle,List} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import { add, resetCategory,get, update } from '../../../features/categories/categoriesSlice.js';
import { useNavigate, useParams,useSearchParams  } from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
function AddCategory() {
  const [name,setName] = useState("");
  const [clickedUpdate,setClickedUpdate] = useState(false);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {success,loading,categories} = useSelector((state)=>state.categories);
  const navigate = useNavigate();

  const handleAddCategory = (e)=>{
    e.preventDefault();
    dispatch(add({name}));
  }
  const handleUpdateCategory = (e)=>{
    e.preventDefault();
    dispatch(update({id:params.id,name}));
    setClickedUpdate(true);
  }
  useEffect(()=>{
    setName("")
    if(searchParams.get("edit") && params.id){
        dispatch(get({id:params.id}));
    }
  },[navigate]);

  useEffect(()=>{
    if(success){
      if(searchParams.get("edit")){
        setName(categories[0].name)
        dispatch(resetCategory());
        if(clickedUpdate) navigate("/admin/lists-category")
        return;
      }
      setName("");
      dispatch(resetCategory());
    }
  },[success,loading,navigate]);

  return (
    <Master>
        <Container sx={{margin:"1rem 0",height:"80%"}}>
            <Paper elevation={3} sx={{padding:"1rem",height:"100%",overflowY:"scroll"}}>
                  <Box display="flex" justifyContent="space-between">
                      <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"rgba(0, 0, 0, 0.54)"}}>
                          <AddCircle  />
                          <Typography variant="subtitle1" fontWeight="bolder" marginLeft=".5rem" >
                            {searchParams.get("edit") ? "Update Category" : "Add Category"} 
                          </Typography>
                      </div>
                      <IconButton onClick={()=>navigate("/admin/lists-category")}>
                        <List />
                      </IconButton>
                  </Box>
                  
                  <Box component="form" onSubmit={searchParams.get("edit") ? handleUpdateCategory : handleAddCategory }>
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
                      <LoadingButton  type="submit" variant="contained" startIcon={<AddCircle />} sx={{margin:"1rem 0"}}>
                        {searchParams.get("edit") ? "Update Category" : "Add Category"} 
                      </LoadingButton>
                  </Box>
                 
            </Paper>
        </Container>
    </Master>
  )
}

export default AddCategory