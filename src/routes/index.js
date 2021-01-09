import React from 'react';
import { Navigate } from 'react-router-dom';
import { GuestLayout, StaffLayout } from 'layouts';
import HomePage from 'pages/guest/HomePage';
import MenuPage from 'pages/guest/MenuPage';
import SignInPage from 'pages/auth/SignInPage';
import SignUpPage from 'pages/auth/SignUpPage';
import { CUSTOMER, STAFF } from 'configs/static'

const routes = (userRole) => [
    {
        path: '/',
        element: userRole === CUSTOMER ? <GuestLayout /> : <Navigate to="/signin" />,
        children: [
            { path: 'cart', element: <HomePage /> },
            { path: 'order', element: <HomePage /> }
        ],
    },
    {
        path: '/',
        element: userRole === STAFF ? <GuestLayout /> : <Navigate to="/signin" />,
        children: [
            { path: 'cart', element: <HomePage /> },
            { path: 'order', element: <HomePage /> },
            { path: 'revenue', element: <HomePage /> }
        ],
    },
    {
        path: '/',
        element: !userRole ? <GuestLayout /> : <Navigate to="/home" />,
        children: [
            { path: 'signin', element: <SignInPage /> },
            { path: 'signup', element: <SignUpPage /> },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: '/', element: <Navigate to="/home" /> },
        ],
    }
];
export default routes;