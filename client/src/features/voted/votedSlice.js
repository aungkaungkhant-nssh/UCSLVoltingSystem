import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthorizationToken from '../../config/AuthorizationToken';
import {toast} from 'react-toastify';
import Axios from "../../config/Axios";
const initialState = {
    loading:false,
    success:null,
    voteds:[],
    error:null
}

export const add = createAsyncThunk("voted/add",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.post("/api/admin/voted",data,AuthorizationToken(adminInfo.token));
        return res.data.voted;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const fetch = createAsyncThunk("voted/fetch",async({uri,categoryId},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    const {userAuth:{userInfo}} = getState();
    try{
        const res = await Axios.get(`/api/${uri}/voted?categoryId=${categoryId || ""}`,AuthorizationToken(uri==="admin" ? adminInfo.token : userInfo.token));
       
        return res.data.voteds;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const remove = createAsyncThunk("voted/remove",async({id},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.delete(`/api/admin/voted/${id}`,AuthorizationToken(adminInfo.token));
        return res.data.voted;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const get = createAsyncThunk("voted/get",async({id},{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.get(`/api/admin/voted/${id}`,AuthorizationToken(adminInfo.token));
        return res.data.voted;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const update = createAsyncThunk("voted/update",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.put(`/api/admin/voted/${data.id}`,data,AuthorizationToken(adminInfo.token));

        return res.data.voted;
  
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

export const sendVote = createAsyncThunk("voted/sendVote",async(data,{getState,rejectWithValue})=>{
    const  {userAuth:{userInfo}} = getState();
    try{
        const res= await Axios.post(`/api/user/send-vote`,data,AuthorizationToken(userInfo.token));
        return res.data;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

const votedSlice = createSlice({
    name:"voted",
    initialState,
    reducers:{
        resetVotedSlice(state){
            state.success = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(add.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(add.fulfilled,(state)=>{
            state.loading = false;
            state.success = true;
            toast.success("Voted Created SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(add.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })


        builder.addCase(fetch.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetch.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.success = true;
            state.voteds = [...payload]
        })
        builder.addCase(fetch.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

        builder.addCase(remove.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(remove.fulfilled,(state,{payload})=>{
            state.loading= false;
            state.success = true;
            state.voteds = state.voteds.filter((c)=>(
                c._id !==payload._id
            ))
            toast.success("Voted Removed SuccessFully",{position:"top-right",autoClose:3000})
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
            state.voteds = [payload]
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
            state.voteds =[payload];
            toast.success("Voted Updated SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(update.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })


        builder.addCase(sendVote.pending,(state,{payload})=>{
            state.loading = true;
            state.error  = null;
        })
        builder.addCase(sendVote.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.success = true;
            toast.success("Voted  SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(sendVote.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })
    }
})

export default votedSlice.reducer;

export const {resetVotedSlice} = votedSlice.actions;


