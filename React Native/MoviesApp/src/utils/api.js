const API_KEY = '5b9b7798'
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page) => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}&type=movie`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`
        );
        return await response.json();
    } catch (error) {
        throw error;
    }
};