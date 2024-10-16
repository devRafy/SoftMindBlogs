import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signupSuccess:(state,action)=>{
            state.currentUser = action.payload;
        },
        signupFail:(state,action)=>{
            state.error = action.payload;
        },
        signInSuccess:(state , action) =>{
            state.currentUser = action.payload;
        },
        signInFail : (state , action) =>{
            state.error = action.payload;
        },
        signOutSuccess:(state)=>{
            state.currentUser = null;
            state.error = null;
        }
    }
});

export const {
        signInSuccess,
        signInFail,
        signupSuccess,
        signupFail,
        signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;