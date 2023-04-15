import {configureStore} from '@reduxjs/toolkit';

import userReducer from "../features/AuthSlice"

import adminReducer from "../features/AdminAuthSlice"
import updateUserReducer from "../features/UpdateUserSlice"

export const store = configureStore({
    reducer: {
        authToken: userReducer,
        adminAuth: adminReducer, 
        updateUser: updateUserReducer,

    }
})
