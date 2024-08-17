
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    profile: {},
    userInfo: {name: "Rashid S Iddi", role: "doctor", email: "ipucha69@gmail.com"}
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeUser(state, action) { 
            state.user = action.payload;
        },
        addUserProfile(state, action) { 
            state.profile = action.payload;
        },
    },
});

export const { changeUser, addUserProfile } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectUserInfo = (state) => state.app.userInfo;
export const selectUserProfile = (state) => state.app.profile;

export default appSlice.reducer;
