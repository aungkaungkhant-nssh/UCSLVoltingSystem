import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthorizationToken from '../../config/AuthorizationToken';
import Axios from '../../config/Axios'
const initialState={
    dashboard:{},
    loading:false,
    success:null,
    error:null
}

export const fetch = createAsyncThunk("dashboard/fetch",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminInfo}} = getState();
    try{
        const res= await Axios.get(`/api/admin/dashboard/${data.id}`,AuthorizationToken(adminInfo.token));
        return res.data.dashboard;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducers:{
      resetDashboardSlice(state){
        state.success = null;
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetch.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetch.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.dashboard = payload;
            state.success = true;
        })
        builder.addCase(fetch.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload
        })

    }
})

export default dashboardSlice.reducer;
export const {resetDashboardSlice} = dashboardSlice.actions;