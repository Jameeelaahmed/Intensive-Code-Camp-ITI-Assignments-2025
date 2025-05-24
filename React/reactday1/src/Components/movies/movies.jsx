import { useState } from 'react'
import classes from './movies.module.css'
import Movie from '../movie/movie';
export default function Movies() {
    const [moviesArr] = useState([
        {
            id: 1,
            name: "Inception",
            image: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg"
        },
        {
            id: 2,
            name: "The Shawshank Redemption",
            image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"
        },
        {
            id: 3,
            name: "The Godfather",
            image: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg"
        },

        {
            id: 7,
            name: "Fight Club",
            image: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            id: 8,
            name: "The Matrix",
            image: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"
        },
        {
            id: 9,
            name: "Interstellar",
            image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
        },]
    );

    return (
        <div className={classes.movies}>
            <div className={classes.movies}>
                {moviesArr.map((movie) => {
                    return (
                        <Movie key={movie.id} movieName={movie.name} img={movie.image} />
                    );
                })}
            </div>
        </div>
    )
}