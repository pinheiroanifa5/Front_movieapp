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
        removeFromMyList: (state, action) => {
            state.myList = state.myList.filter(movie => movie.id !== action.payload);
        },
        getAllMyListMovies: (state, action) => {
            state.myList = action.payload
        },
        resetMyList: (state, action) => {
            state.myList = action.payload
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

export const addToMyList = (token, movie) => {
    return async (dispatch) => {
        try {
            await api.post(`movies/myList/${movie.id}`, movie, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch(NetflixSlice.actions.addToMyList(movie));
            console.log({ movie })
            return true;
        } catch (error) {
            console.error("Error adding movie to My List:", error);
            return false;
        }
    }
}
export const removeFromMyList = (movieId, token) => {
    return async (dispatch) => {
        try {

            await api.delete(`movies/myList/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch(NetflixSlice.actions.removeFromMyList(movieId));
            return true;
        } catch (error) {
            console.error("Error removing movie from My List:", error);
            return false;
        }
    }


}
export const getAllMyListMovies = (token) => {
    return async (dispatch) => {
        try {
            const response = await api.get('movies/myList/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(NetflixSlice.actions.getAllMyListMovies(response.data))
        } catch (error) {

        }
    }
}

export const resetMyList = () => {
    return async (dispatch) => {
        dispatch(NetflixSlice.actions.resetMyList([]))
    }
}
export default NetflixSlice.reducer