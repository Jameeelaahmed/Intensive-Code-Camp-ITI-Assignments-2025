import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetails from "../pages/MovieDetails/MovieDetails";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/movies', element: <MoviesPage /> },
            { path: '/movies/:id', element: <MovieDetails /> },
            { path: '/about', element: <About></About> },
        ]
    }
])

export default function RoutesPage() {
    return <RouterProvider router={routes} />
}