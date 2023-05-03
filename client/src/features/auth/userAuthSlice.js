import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Axios from '../../config/Axios'
import {toast} from 'react-toastify';


const initialState ={
    loading:false,
    userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    error:null,
    success:false
}
export const register = createAsyncThunk("userAuth/register",async({name,phone,password},{rejectWithValue})=>{
    try{
        const {data:{data}} = await Axios.post('/api/user/register',{name,phone,password});  
        return data;
    }catch(err){
        if(err.response &&  err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }

})


export const login = createAsyncThunk("userAuth/login",async({phone,password},{rejectWithValue})=>{
    try{
        const {data:{data}} = await Axios.post('/api/user/login',{phone,password});
        return data;
    }catch(err){
        if(err.response && err.response.data.message){
            return rejectWithValue(err.response.data.message)
        }else{
            return rejectWithValue(err.response.message)
        }
    }
})

const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.userInfo = null;
            state.success =false;
        },
        userVoted:(state,{payload})=>{
            let isVoted = state.userInfo.vt.find((v)=>v.categoryId===payload.categoryId && v.votedId===payload.votedId)
            if(!isVoted){
                let updateUserInfo =  {...state.userInfo,vt:[...state.userInfo.vt,payload]}
                state.userInfo = updateUserInfo;
                localStorage.setItem("userInfo",JSON.stringify(updateUserInfo));
            }
        }
    },
    extraReducers(builder){
        builder.addCase(register.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(register.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.success = true;
            state.userInfo = payload;
            localStorage.setItem("userInfo",JSON.stringify(payload));
            toast.success("Register SuccessFully",{position:"top-right",autoClose:3000})
           
        })
        builder.addCase(register.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })


        builder.addCase(login.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled,(state,{payload})=>{
            state.loading  = false;
            state.success = true;
            state.userInfo = payload;
            localStorage.setItem("userInfo",JSON.stringify(payload));
            toast.success("Login SuccessFully",{position:"top-right",autoClose:3000})
        })
        builder.addCase(login.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            toast.error(payload,{postion:"top-right",autoClose:3000})
        })
    }
})

export default userAuthSlice.reducer;
export const {logout,userVoted} = userAuthSlice.actions;