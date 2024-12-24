import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const  GetUserData=createAsyncThunk(
    "getuserdata",
    ()=>{
        const Isuser=localStorage.getItem("user")

        if(Isuser !=null || Isuser !=undefined){

         return{
             user:JSON.parse(Isuser)
         }
        } else{
         return{
             user:null
         }
        }
    }
)
const User=createSlice(
{
    name:"userData",
    initialState: {
            user:null
        },
    reducers:{
        login:(state,{payload})=>{
            console.log(payload)
state.user=payload.user
localStorage.setItem('user', JSON.stringify(payload.user))
        },
        logout:(state,{payload})=>{
            state.user=null
            localStorage.removeItem('user')
        }
    },
    
    
    extraReducers:(bulider)=>{
bulider.addCase(
    GetUserData.fulfilled,
    ( state,{payload})=>{
state.user=payload.user
    }
)
    }
}
)
 export {GetUserData};
export const{login,logout}=User.actions
export default User.reducer