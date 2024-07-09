import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./NetflixSlice";

const initialState = {
    myinfo: {},
    users: [],
};

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getMe: (state, action) => {
            state.myinfo = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    },
});

export const { getMe: setMe, setUsers } = UsersSlice.actions;

export default UsersSlice.reducer;


export const fetchAllUsers = (token) => {
    return async (dispatch) => {
        try {
            const response = await api.get("users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setUsers(response.data));
        } catch (error) {
            if (error.response) {
                const { message: errorMessage } = error.response.data;
                console.log({ errorMessage });
            }
        }
    };
};

//  user info
export const getMe = (token) => {
    return async (dispatch) => {
        try {
            const response = await api.get("users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setMe(response.data));
        } catch (error) {
            if (error.response) {
                const { message: errorMessage } = error.response.data;
                console.log({ errorMessage });
            }
        }
    };
};
