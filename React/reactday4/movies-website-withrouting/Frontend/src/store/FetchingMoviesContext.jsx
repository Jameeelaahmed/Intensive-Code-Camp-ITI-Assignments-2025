import { createContext, useEffect, useState } from "react";


export default function MoviesProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAllMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/movies");
            const data = await res.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMovieById = async (id) => {
        setSelectedMovie(null);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/movies/${id}`);
            const data = await res.json();
            setSelectedMovie(data);
        } catch (error) {
            console.error("Error fetching movie by ID:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllMovies();
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                movies,
                selectedMovie,
                fetchAllMovies,
                fetchMovieById,
                loading,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export const MoviesContext = createContext();