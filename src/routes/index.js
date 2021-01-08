import React from 'react';
import { Navigate } from 'react-router-dom';
import { GuestLayout, StaffLayout } from 'layouts';
import Home from 'pages/guest/Home';
import Menu from 'pages/guest/Menu';


const routes = (isLoggedIn) => [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'menu', element: <Menu /> },
            { path: '/', element: <Navigate to="/home" /> },
        ],
    }


];
export default routes;