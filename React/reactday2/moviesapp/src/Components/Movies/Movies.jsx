import { Component } from 'react';
import axios from 'axios';
import Movie from '../Movie/Movie';
import classes from './Movies.module.css'
class Movies extends Component {
    state = {
        movies: [],
        loading: true,
        error: null
    };

    componentDidMount() {
        axios.get('https://ghibliapi.vercel.app/films')
            .then(response => {
                this.setState({
                    movies: response.data.slice(0, 10),
                    loading: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    render() {
        const { movies, loading, error } = this.state;

        if (loading) return <p>Loading movies...</p>;
        if (error) return <p>Error loading movies: {error.message}</p>;

        return (
            <div className={classes.movies_container}>
                <div className={classes.movies}>
                    {movies.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Movies;
