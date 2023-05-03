import React from 'react'
import Master from '../layout/Master';
import {Container,Paper,IconButton,Typography,Box} from "@mui/material";
import {List,AddCircle,Delete,Edit} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { fetch,remove } from '../../../features/voted/votedSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
function VotedLists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {voteds,loading,error,success} = useSelector((state)=>state.voteds);

  const [data,setData] = useState([]);
  useEffect(()=>{
    dispatch(fetch({uri:"admin"}));
  },[]);
  useEffect(()=>{
    if(success){
        setData(voteds)
    }
},[success,navigate,voteds]);
    const columns =[
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'rollNo', headerName: 'rollNo', width: 130 },
        { field: 'voteCount', headerName: 'Count', width: 130 },
        { field: 'category', headerName: 'Category', width: 130,valueGetter:(voted)=>{
            return voted.row.categoryId.name;
        } },
        { field: 'edit', headerName: 'Edit', width: 130,sortable:false ,renderCell:(voted)=>(
            <IconButton onClick={()=>navigate(`/admin/edit-voted/${voted.id}?editVoted=true`)}>
                <Edit color="warning" />
            </IconButton>
        )  },
        { field: 'delete', headerName: 'Delete', width: 130,sortable:false ,renderCell:(voted)=>(
            <IconButton onClick={()=>dispatch(remove({id:voted.id}))}>
                <Delete color="error" />
            </IconButton>
        ) },

    ]
  return (
    <Master>
    <Container  sx={{margin:"1rem 0",height:"80%"}}>
            <Paper  elevation={3} sx={{padding:"1rem",height:"100%",overflowY:"scroll"}}>
                <Box display="flex" justifyContent="space-between">
                    <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"rgba(0, 0, 0, 0.54)"}}>
                        <List  />
                        <Typography variant="subtitle1" fontWeight="bolder" marginLeft=".5rem" >
                            Lists Voted
                        </Typography>
                    </div>
                    <IconButton onClick={()=>navigate("/admin/add-voted")}>
                        <AddCircle />
                    </IconButton>
                </Box>
                <div style={{ height: "90%", width: '100%',margin:".5rem auto" }}>
                   {
                   
                    error ? <p>{error}</p>
                    : <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        loading={loading}
                        getRowId={(row)=> row._id}
                     />
                   }
                </div>
            </Paper>
    </Container>
</Master>
  )
}

export default VotedLists