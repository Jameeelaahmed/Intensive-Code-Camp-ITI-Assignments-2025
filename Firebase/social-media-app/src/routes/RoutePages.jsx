import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayouts/AuthLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LoginPage from '../Pages/auth/Login/Login';
import SignUpPage from '../Pages/auth/SignUp/SignUp';
import FeedPage from '../Pages/Feed/Feed';

const routeConfig = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <FeedPage />
            },
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

const router = createBrowserRouter(routeConfig);

const RoutesPages = () => {
    return <RouterProvider router={router} />;
};

export default RoutesPages;