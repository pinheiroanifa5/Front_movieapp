import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/"
})

const initialState = {
    movies: [],
    generesLoaded: false,
    genres: [],
};

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    reducers: {
        getAllMovies: (state, action) => {
            const movies = action.payload
            state.movies = movies
        }
    },
});

export const getAllMovies = (token, name = "") => {
    return async (dispatch) => {
        try {
            await api.get("movies", {
                params: { name },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => dispatch(NetflixSlice.actions.getAllMovies(response.data)))
            return true
        } catch (error) {
            if (error.response) {
                const { message: errorMessage, statusCode } = error.response.data
                console.log({ errorMessage, statusCode })
            }
            return false
        }

    }
}

export default NetflixSlice.reducer