
import {
    configureStore,
} from "@reduxjs/toolkit";



import NetflixSlice from "./reducers/NetflixSlice";
import usersSlice from "./reducers/usersSlice";

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice,
        users: usersSlice
    },
});
