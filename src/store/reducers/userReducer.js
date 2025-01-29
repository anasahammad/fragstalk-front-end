import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {userInfo: null};
const adminInitialState = {adminInfo: null};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        resetUserInfo(state) {
            state.userInfo = null;
        }
    }
}

)
const adminSlice = createSlice({
    name: 'admin',
    initialState: adminInitialState,
    reducers: {
        setAdminInfo(state, action) {
            state.userInfo = action.payload;
        },
        resetAdminInfo(state) {
            state.userInfo = null;
        }
    }
}

)

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
const adminActions = adminSlice.actions;
const adminReducer = adminSlice.reducer;


export { userActions, userReducer, adminActions, adminReducer };