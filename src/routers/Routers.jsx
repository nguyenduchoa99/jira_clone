import React from 'react'
import { useRoutes } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import MainLayout from '../components/MainLayout/MainLayout'
import Login from '../modules/Authentication/pages/Login';
import Register from '../modules/Authentication/pages/Register';
import CreateProject from '../modules/projectTask/projects/CreateProject';
import ListProject from '../modules/projectTask/projects/ListProject';
import UpdateProject from '../modules/projectTask/projects/UpdateProject';
import CreateUser from '../modules/projectTask/user/CreateUser';
import ListUser from '../modules/projectTask/user/ListUser';
import UpdateUser from '../modules/projectTask/user/UpdateUser';

const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/createProject',
                    element: <CreateProject />
                },
                {
                    path: '/listProject',
                    element: <ListProject />
                },
                {
                    path: '/updateProject/:projectId',
                    element: <UpdateProject />
                },
                {
                    path: '/createUser',
                    element: <CreateUser />
                },
                {
                    path: '/user',
                    element: <ListUser />
                },
                {
                    path:'/user/:userId',
                    element:<UpdateUser />
                }
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    path: '/auth/login',
                    element: <Login />
                },
                {
                    path: '/auth/register',
                    element: <Register />
                }
            ]
        }
    ])
    return routing
}

export default Routers