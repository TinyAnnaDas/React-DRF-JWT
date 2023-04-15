import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    editedUser: false, 
    createdUser:false,
    deletedUser:false,

}

const updateUserSlice = createSlice(
    {
        name: 'updateUser',
        initialState,
        reducers: {
            edit: (state) => {
                state.editedUser = !state.editedUser
            },
            create: (state) => {
                state.createdUser = !state.createdUser
            },
            delete_user: (state) => {
                state.deletedUser = !state.deletedUser
            }
        }

    }
)

export const {edit, delete_user, create, } = updateUserSlice.actions

export default updateUserSlice.reducer