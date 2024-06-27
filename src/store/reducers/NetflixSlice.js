import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/"
})

const initialState = {
    movies: [],
    generesLoaded: false,
    myList: [],  //film de usuarios fav
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
        },
        editMovie: (state, action) => {
            const editedMovie = action.payload
            state.movies = state.movies.map((movie) => {
                return movie.id === editedMovie.id ? editedMovie : movie
            })
        },
        addToMyList: (state, action) => {
            state.myList = [...state.myList, action.payload]

        },
        removeFromList: (state, action) => {
            state.myList = state.myList.filter(movie => movie.id !== action.payload.id);
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

export const editMovie = (token, movie) => {
    return async (dispatch) => {
        try {
            const response = await api.patch(`movies/${movie.id}`, movie, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(NetflixSlice.actions.editMovie(response.data))

            return true

        } catch (error) {

            if (error.response) {
                const { message: errorMessage } = error.response.data
                alert(errorMessage)
            }
            return false
        }
    }
}

export const addToMyList = (movie) => {
    return async (dispatch) => {
        try {

            dispatch(NetflixSlice.actions.addToMyList(movie));
            console.log({ movie })
            return true;
        } catch (error) {
            console.error("Error adding movie to My List:", error);
            return false;
        }
    }
}
export const removeFromMyList = (movie) => {
    return async (dispatch) => {
        try {

            dispatch(NetflixSlice.actions.removeFromMyList(movie));
            return true;
        } catch (error) {
            console.error("Error removing movie from My List:", error);
            return false;
        }
    }
}
export default NetflixSlice.reducer