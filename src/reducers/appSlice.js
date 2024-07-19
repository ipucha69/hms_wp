
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userInfo: {name: "Rashid S Iddi", role: "doctor", email: "ipucha69@gmail.com"}
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeUser(state, action) { 
            state.user = action.payload;
        },
    },
});

export const { changeUser } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectUserInfo = (state) => state.app.userInfo;

export default appSlice.reducer;
