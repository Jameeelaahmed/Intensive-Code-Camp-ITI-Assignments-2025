import classes from './movie.module.css'
export default function Movie(props) {
    return (
        <div className={classes.movie}>
            <h1>{props.movieName}</h1>
            <img src={props.img} alt="" />
        </div>
    )
}