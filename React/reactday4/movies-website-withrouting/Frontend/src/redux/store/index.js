import { configureStore } from "@reduxjs/toolkit";
import movieSlice from './movieslice'
const store = configureStore({
    reducer: {
        movie: movieSlice
    }
})

export default store;