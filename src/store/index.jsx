
import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";
import NetflixSlice from "./reducers/NetflixSlice";

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice,
    },
});
