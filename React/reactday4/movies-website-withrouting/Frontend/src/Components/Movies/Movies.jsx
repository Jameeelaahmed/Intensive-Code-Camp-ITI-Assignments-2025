import classes from './Movies.module.css';
// import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MoviesContext } from '../../store/FetchingMoviesContext';
function Movies() {
    const { movies } = useContext(MoviesContext);
    const location = useLocation().pathname;
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
