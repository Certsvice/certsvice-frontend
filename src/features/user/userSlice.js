import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    walletAddress:"",
    photo:"",
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserLoginDetails:(state,action) => {
            state.walletAddress = action.payload.name;
            state.photo = action.payload.photo;
        },

        setSignOutState:(state) =>{
            state.walletAddress = null;
            state.photo = null;
        }
    }
})

export const{ setUserLoginDetails,setSignOutState} = userSlice.actions;
export const selectUserWallet= (state) => state.user.walletAddress;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;