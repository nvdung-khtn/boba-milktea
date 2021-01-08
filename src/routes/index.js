import React from 'react';
import { Navigate } from 'react-router-dom';
import { GuestLayout, StaffLayout } from 'layouts';
import Home from 'pages/guest/Home';


const routes = (isLoggedIn) => [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: '/', element: <Navigate to="/home" /> },
        ],
    }


];
export default routes;