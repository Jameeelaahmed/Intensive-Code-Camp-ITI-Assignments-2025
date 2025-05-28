import Movies from "../../Components/Movies/Movies";
import { useLoaderData } from "react-router-dom";
function MoviesPage() {
    const movies = useLoaderData();

    return (
        <Movies movies={movies}></Movies>
    );
}

export default MoviesPage;
