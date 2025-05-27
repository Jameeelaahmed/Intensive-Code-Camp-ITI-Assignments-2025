import classes from './Movies.module.css';
import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
function Movies() {
    const [movies, setMovies] = useState([]);
    const location = useLocation().pathname;
    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data || []);
                console.log(data)
            })
            .catch((err) => {
                console.error("Error fetching movies:", err);
                setMovies([]);
            });
    }, []);

    return (
        <div className={`${classes.movie_container} ${location === '/movies' ? classes.add_margin : ""}`}>
            <div className={classes.movies}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <Movie key={movie.id} data={movie} />
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
}

export default Movies;
