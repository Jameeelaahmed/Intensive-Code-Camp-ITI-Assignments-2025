import classes from './Movie.module.css';
import { Link } from 'react-router-dom';

function Movie({ data }) {

    return (
        <Link to={`/movies/${data.id}`} className={classes.movie_link}>
            <div className={classes.movie}>
                <img src={data.image_url} alt={data.title} className={classes.image} />
                <h2 className={classes.title}><strong>Movie Name:</strong> {data.title}</h2>
                <p className={classes.title}><strong>Release Date:</strong> {data.release_date}</p>
                <p className={classes.title}><strong>Rating:</strong> {data.rating}</p>
            </div>
        </Link>
    );
}

export default Movie;
