import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import { lazy, Suspense } from 'react';
import FavouritePage from "../pages/FavouritePage/FavouritePage";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));


const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/movies', element: <MoviesPage /> },
            { path: '/movies/:id', element: <MovieDetails /> },
            { path: '/about', element: <About></About> },
            { path: '/favouritsPage', element: <FavouritePage /> },
            { path: '/profile', element: <Profile /> }
        ]
    },
    {
        path: 'sign',
        element: <SignUp />
    },
    {
        path: 'login',
        element: <Login />
    }
])

export default function RoutesPage() {
    return <Suspense fallback={<p>Loading page...</p>}>
        <RouterProvider router={routes} />
    </Suspense>

}