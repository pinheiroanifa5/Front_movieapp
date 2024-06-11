import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./NetflixSlice";

const initialState = {
    myinfo: {}
};

const UsersSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        getMe: (state, action) => {
            state.myinfo = action.payload
        },
    },
});

export default UsersSlice.reducer;


export const getMe = (token) => {
    return async (dispatch) => {
        try {
            const response = await api.get("users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(UsersSlice.actions.getMe(response.data))
        } catch (error) {
            if (error.response) {
                const { message: errorMessage } = error.response.data
                console.log({ errorMessage })
            }
        }
    }
}