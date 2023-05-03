import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from "../../config/Axios";
import AuthorizationToken from '../../config/AuthorizationToken';
import {toast} from 'react-toastify';

const initialState = {
    categories:[],
    success:null,
    error:null,
    loading:false
}
export const add = createAsyncThunk("category/add",async({name},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const {data:{data}} = await Axios.post('/api/admin/category',{name},AuthorizationToken(adminInfo.token));  
        return data;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})
export const fetch = createAsyncThunk("category/fetch",async({uri},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    const {userAuth:{userInfo}} = getState();
    try{
        const res= await Axios.get(`/api/${uri}/category`,AuthorizationToken(uri==="admin" ? adminInfo.token : userInfo.token));
        return res.data.categories;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})
export const remove = createAsyncThunk("category/remove",async({id},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.delete(`/api/admin/category/${id}`,AuthorizationToken(adminInfo.token));
        return res.data.category;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const get = createAsyncThunk("category/get",async({id},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.get(`/api/admin/category/${id}`,AuthorizationToken(adminInfo.token));
        return res.data.category;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const update = createAsyncThunk("category/update",async({id,name},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.put(`/api/admin/category/${id}`,{name},AuthorizationToken(adminInfo.token));
        return res.data.category;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})
const categoriesSlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        resetCategory(state){
            state.success = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(add.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(add.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.success = true;
            toast.success("Category Created SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(add.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })


        builder.addCase(fetch.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetch.fulfilled,(state,{payload})=>{
            state.loading= false;
            state.success = true;
            state.categories = [...payload]
        })
        builder.addCase(fetch.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })


        builder.addCase(remove.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(remove.fulfilled,(state,{payload})=>{
            state.loading= false;
            state.success = true;
            state.categories = state.categories.filter((c)=>(
                c._id !==payload._id
            ))
            toast.success("Category Removed SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(remove.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })


        builder.addCase(get.pending,(state,{payload})=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(get.fulfilled,(state,{payload})=>{
            state.loading= false;
            state.success = true;
            state.categories = [payload]
        })
        builder.addCase(get.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })

        
        builder.addCase(update.pending,(state,{payload})=>{
            state.loading = true;
            state.error  = null;
        })
        builder.addCase(update.fulfilled,(state,{payload})=>{
            state.loading = true;
            state.success = true;
            state.categories =[payload];
            toast.success("Category Updated SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(update.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })
    }
})
export default categoriesSlice.reducer;

export const {resetCategory} = categoriesSlice.actions;