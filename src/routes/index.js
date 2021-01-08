import React from 'react';
import { Navigate } from 'react-router-dom';
import { GuestLayout, StaffLayout } from 'layouts';
import HomePage from 'pages/guest/HomePage';
import MenuPage from 'pages/guest/MenuPage';
import SignInPage from 'pages/auth/SignInPage';
import SignUpPage from 'pages/auth/SignUpPage';


const routes = (isLoggedIn) => [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: 'signin', element: <SignInPage /> },
            { path: 'signup', element: <SignUpPage /> },
            { path: '/', element: <Navigate to="/home" /> },
        ],
    }


];
export default routes;