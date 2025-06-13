import classes from './Movies.module.css';
// import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MoviesContext } from '../../store/FetchingMoviesContext';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../redux/store/movieslice';
function Movies() {
    const { movies } = useContext(MoviesContext);
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    function addMovieToFavourite(movie) {
        console.log(movie)
        dispatch(movieActions.addMovieToFavourits(movie))
    }

    return (
        <div className={`${classes.movie_container} ${location === '/movies' ? classes.add_margin : ""}`}>
            <div className={classes.movies}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className={classes.movie}>
                            <Movie data={movie} />
                            <div className={classes.heartAbsolute}>
                                <div className={classes.heart_container} title="Like" onClick={() => addMovieToFavourite(movie)}>
                                    <input type="checkbox" className={classes.checkbox} id="Give-It-An-Id" />
                                    <div className={classes.svg_container}>
                                        <svg viewBox="0 0 24 24" className={classes.svg_outline} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                            </path>
                                        </svg>
                                        <svg viewBox="0 0 24 24" className={classes.svg_filled} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                            </path>
                                        </svg>
                                        <svg className={classes.svg_celebrate} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                            <polygon points="10,10 20,20"></polygon>
                                            <polygon points="10,50 20,50"></polygon>
                                            <polygon points="20,80 30,70"></polygon>
                                            <polygon points="90,10 80,20"></polygon>
                                            <polygon points="90,50 80,50"></polygon>
                                            <polygon points="80,80 70,70"></polygon>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
}

export default Movies;
