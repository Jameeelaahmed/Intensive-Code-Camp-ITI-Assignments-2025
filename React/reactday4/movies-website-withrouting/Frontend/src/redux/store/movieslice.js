import { createSlice } from "@reduxjs/toolkit";
const initialMovieState = { items: [], state: null, totalMovies: 0 };

const movieSlice = createSlice({
    name: "movie",
    initialState: initialMovieState,
    reducers: {
        addMovieToFavourits(state, action) {
            const addedMovie = action.payload;
            console.log(addedMovie)
            const existingMovieIndex = state.items.findIndex((item) => (item.id === addedMovie.id));
            if (existingMovieIndex !== -1) {
                console.log("movie is already in favourite");
                return;
            } else {
                state.items.push({ ...addedMovie });
                state.totalMovies += 1;
            }
        },
        removeMovieFromFavourite(state, action) {
            const deletedMovie = action.payload;
            const existingMovieIndex = state.items.findIndex((item) => (item.id === deletedMovie.id));
            if (existingMovieIndex !== -1) {
                state.totalMovies -= 1;
                state.items.splice(existingMovieIndex, 1)
            }
        },
        removeAllMoviesFromFavourit(state, action) {
            const deletedMovie = action.payload;
            const existingMovieIndex = state.items.findIndex((item) => (item.id === deletedMovie.id));
            if (existingMovieIndex !== -1) {
                state.totalMovies -= 1;
                state.items.splice(existingMovieIndex, 1)
            }
        }
    }
})

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;