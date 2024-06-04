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
        },
        addNewMovie: (state, action) => {
            const newMovie = action.payload
            state.movies = [...state.movies, newMovie]
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

export const addMovie = (token, data, setMessage, setErrorDetails) => {
    return async (dispatch) => {
        try {
            const response = await api.post('movies', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch(NetflixSlice.actions.addNewMovie(response.data))

            return true
        } catch (error) {
            if (error.response) {
                const { message: errorMessage, statusCode } = error.response.data
                setMessage('An error occurred. Please try again.');
                setErrorDetails(errorMessage);
                console.log({ errorMessage, statusCode })
            }
            return false
        }
    }
}


export default NetflixSlice.reducer