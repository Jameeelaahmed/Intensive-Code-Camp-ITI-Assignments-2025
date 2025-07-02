import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayouts/AuthLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LoginPage from '../Pages/auth/Login/Login';
import SignUpPage from '../Pages/auth/SignUp/SignUp';
import FeedPage from '../Pages/Feed/Feed';
// import ProfilePage from '../components/profile/ProfilePage';

const routeConfig = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <FeedPage />
            },
            // {
            //     path: 'profile',
            //     element: <ProfilePage />
            // }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignUpPage />
            }
        ]
    }
];

const renderRoutes = (routes) => {
    return routes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            element={route.element}
        >
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
};

const RoutesPages = () => {
    return <Routes>{renderRoutes(routeConfig)}</Routes>;
};

export default RoutesPages;