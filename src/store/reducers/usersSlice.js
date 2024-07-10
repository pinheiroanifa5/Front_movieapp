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
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        }
    },
});

export const { getMe: setMe, setUsers } = UsersSlice.actions;

export default UsersSlice.reducer;


export const fetchAllUsers = (token) => {
    return async (dispatch) => {
        try {
            const response = await api.get("users/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setUsers(response.data));
            return true
        } catch (error) {
            if (error.response) {
                const { message: errorMessage } = error.response.data;
                console.log({ errorMessage });
                alert(errorMessage)
            }
            return false
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
export function deleteUser(token, user) {
    return async (dispatch) => {
        try {
            await api.delete(`users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(UsersSlice.actions.deleteUser(user.id))
            alert(`${user.name} eliminado com sucesso`)
        } catch (error) {
            if (error.response) {
                const { message: errorMessage } = error.response.data;
                alert(errorMessage)
            }
        }
    }

}
