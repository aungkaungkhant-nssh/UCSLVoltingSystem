import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from "../../config/Axios";
import {toast} from 'react-toastify';
const initialState = {
    adminInfo:localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null,
    loading:false,
    success:null,
    error:null
}

export const login = createAsyncThunk("adminAuth/login",async({phone,password},{rejectWithValue})=>{
    try{
        let {data:{data}} = await Axios.post("/api/admin/login",{phone,password});
        return data;
    }catch(err){
        if(err.response && err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

const adminAuthSlice= createSlice(
    {
        name:"adminAuth",
        initialState,
        reducers:{
            logout:(state)=>{
                state.adminInfo = null;
                state.success= null;
            }
        },
        extraReducers:(builder)=>{
            builder.addCase(login.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(login.fulfilled,(state,{payload})=>{
                state.loading = false;
                state.success = true;
                state.adminInfo = payload;
                localStorage.setItem("adminInfo",JSON.stringify(payload));
                toast.success("Login SuccessFully",{position:"top-right",autoClose:3000})
            })
            builder.addCase(login.rejected,(state,{payload})=>{
                state.loading = false;
                state.error = payload
                toast.error(payload,{postion:"top-right",autoClose:3000})
            })
        }
    }
)

export default adminAuthSlice.reducer;
export const {logout}  = adminAuthSlice.actions;
