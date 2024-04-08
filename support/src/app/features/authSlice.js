import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const {login, logout, register} = authSlice.actions;
export default authSlice.reducer;

