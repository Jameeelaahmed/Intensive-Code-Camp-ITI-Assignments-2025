import { useSelector } from "react-redux"
import classes from './FavouritePage.module.css'
import Movie from "../../Components/Movie/Movie";
import { useDispatch } from "react-redux";
import { movieActions } from "../../redux/store/movieslice";
function FavouritePage() {
    const movies = useSelector(state => state.movie.items);
    const dispatch = useDispatch();

    function removeMovieFromFav(movie) {
        dispatch(movieActions.removeMovieFromFavourite(movie))
    }
    return (
        <div className={classes.favMovie}>
            <div className={classes.delete_all}>
                <button>Delete All</button>
            </div>
            {movies.map((movie) => (
                <div key={movie.id} className={classes.movie}>
                    <Movie data={movie} />
                    <div className={classes.button_absolute}>
                        <button className={classes.bin_button} onClick={() => removeMovieFromFav(movie)}>
                            <svg
                                className={classes.bin_top}
                                viewBox="0 0 39 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                <line
                                    x1="12"
                                    y1="1.5"
                                    x2="26.0357"
                                    y2="1.5"
                                    stroke="white"
                                    stroke-width="3"
                                ></line>
                            </svg>
                            <svg
                                className={classes.bin_bottom}
                                viewBox="0 0 33 39"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <mask id="path-1-inside-1_8_19" fill="white">
                                    <path
                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                    ></path>
                                </mask>
                                <path
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                    fill="white"
                                    mask="url(#path-1-inside-1_8_19)"
                                ></path>
                                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                            </svg>
                        </button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default FavouritePage
