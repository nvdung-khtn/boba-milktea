import React from 'react';
import { Navigate } from 'react-router-dom';
import { GuestLayout, StaffLayout } from 'layouts';
//page
import HomePage from 'pages/guest/HomePage';
import MenuPage from 'pages/guest/MenuPage';
import SignInPage from 'pages/auth/SignInPage';
import SignUpPage from 'pages/auth/SignUpPage';
import HistoryPurchase from 'pages/customer/HistoryPurchase'

import { CUSTOMER, STAFF } from 'configs/static'

const routes = (userRole) => [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: '/', element: <Navigate to="/home" /> },
        ],
    },
    {
        path: '/',
        element: userRole === CUSTOMER ? <GuestLayout /> : <Navigate to="/signin" />,
        children: [
            { path: 'cart', element: <HomePage /> },
            { path: 'history-purchase', element: <HistoryPurchase /> },
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

];
export default routes;