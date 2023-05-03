import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import Master from '../layout/Master';
import {Paper,Box,IconButton,Typography} from '@mui/material';
import {List,AddCircle,Delete,Edit} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {fetch, remove} from '../../../features/categories/categoriesSlice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CategoryLists() {
    const navigate = useNavigate();
    const {categories,loading,error,success} = useSelector((state)=>state.categories);
    const [data,setData]= useState([]);
    const dispatch = useDispatch();

    const columns =[
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'edit', headerName: 'Edit', width: 130,sortable:false ,renderCell:(category)=>(
            <IconButton onClick={()=>navigate(`/admin/edit-category/${category.id}?edit=true`)}>
                <Edit color="warning" />
            </IconButton>
        )  },
        { field: 'delete', headerName: 'Delete', width: 130,sortable:false ,renderCell:(category)=>(
            <IconButton onClick={()=>dispatch(remove({id:category.id}))}>
                <Delete color="error" />
            </IconButton>
        ) },
    
    ]
    useEffect(()=>{
        dispatch(fetch({uri:"admin"}));
    },[]);
    useEffect(()=>{
        if(success){
            setData(categories)
        }
    },[success,navigate,categories])
  return (
    <Master>
        <Container  sx={{margin:"1rem 0",height:"80%"}}>
                <Paper  elevation={3} sx={{padding:"1rem",height:"100%",overflowY:"scroll"}}>
                    <Box display="flex" justifyContent="space-between">
                        <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"rgba(0, 0, 0, 0.54)"}}>
                            <List  />
                            <Typography variant="subtitle1" fontWeight="bolder" marginLeft=".5rem" >
                                Lists Category
                            </Typography>
                        </div>
                        <IconButton onClick={()=>navigate("/admin/add-category")}>
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
                            getRowId={(row)=>row._id}
                         />
                       }
                    </div>
                </Paper>
        </Container>
    </Master>
  )
}

export default CategoryLists