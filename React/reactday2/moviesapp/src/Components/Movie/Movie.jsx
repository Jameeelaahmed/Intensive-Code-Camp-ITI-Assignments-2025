import { Component } from 'react';
import classes from './Movie.module.css'
class Movie extends Component {
    render() {
        const { title, description, image } = this.props.movie;
        // console.log(description)
        return (
            <div className={classes.movie}>
                <h3>{title}</h3>
                {image && <img src={image} alt={title} style={{ width: '100%' }} />}
                <div>{description}</div>
            </div>
        );
    }
}

export default Movie;
