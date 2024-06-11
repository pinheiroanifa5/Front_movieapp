
import {
    configureStore,
} from "@reduxjs/toolkit";



import NetflixSlice from "./reducers/NetflixSlice";
import usersSlice from "./reducers/UsersSlice";

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice,
        users: usersSlice
    },
});
