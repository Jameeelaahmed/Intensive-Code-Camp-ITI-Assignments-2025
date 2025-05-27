import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classes from './MovieDetails.module.css'
function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/movies/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className={classes.movie_details}>
            <div className={classes.details_container}>
                <h1><strong>Movie Name: </strong>{movie.title}</h1>
                <p><strong>Movie Rating: </strong>{movie.rating}</p>
                <p><strong>Movie Overview: </strong>{movie.overview}</p>
                <p><strong>Trailer URL: </strong><a>{movie.trailer_url}</a></p>
                <p><strong>Genres: </strong><a>{movie.genres.join(' - ')}</a></p>
                <div className={classes.box}>
                    <p><strong>Directors: </strong>{movie.directors.join(' - ')}</p>
                    <p><strong>Writers: </strong>{movie.writers.join(' - ')}</p>
                </div>
            </div>
            <div className={classes.img_container}>
                <img src={movie.cover_img} alt="" />
                <p></p>
            </div>
        </div>
    );
}

export default MovieDetails
