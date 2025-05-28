import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { MoviesContext } from '../../store/FetchingMoviesContext';
import classes from './MovieDetails.module.css';

function MovieDetails() {
    const { id } = useParams();
    const { fetchMovieById, selectedMovie, loading } = useContext(MoviesContext);

    useEffect(() => {
        fetchMovieById(id);
    }, [id]);

    if (loading || !selectedMovie) return <p>Loading...</p>;

    const movie = selectedMovie;

    return (
        <div className={classes.movie_details}>
            <div className={classes.details_container}>
                <h1><strong>Movie Name: </strong>{movie.title}</h1>
                <p><strong>Movie Rating: </strong>{movie.rating}</p>
                <p><strong>Movie Overview: </strong>{movie.overview}</p>
                <p><strong>Trailer URL: </strong><a>{movie.trailer_url}</a></p>
                <p><strong>Genres: </strong>{movie.genres.join(' - ')}</p>
                <div className={classes.box}>
                    <p><strong>Directors: </strong>{movie.directors.join(' - ')}</p>
                    <p><strong>Writers: </strong>{movie.writers.join(' - ')}</p>
                </div>
            </div>
            <div className={classes.img_container}>
                <img src={movie.cover_img} alt={movie.title} />
            </div>
        </div>
    );
}

export default MovieDetails;
