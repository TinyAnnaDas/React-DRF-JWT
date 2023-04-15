import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    authToken: localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null, 
    
    user: localStorage.getItem('authTokens')? jwtDecode (localStorage.getItem('authTokens')): null, 
}

const authTokenSlice = createSlice({
    name : 'authToken',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.authToken = action.payload.authToken;
            state.user = action.payload.user
          },
        logoutUser:(state) => {
            state.authToken = null
            state.user = null
            localStorage.removeItem('authTokens')
        }
    }
});


export const { setAuth, logoutUser } = authTokenSlice.actions;

export default authTokenSlice.reducer;