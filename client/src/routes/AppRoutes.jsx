// AppRoutes.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ResetPassword from '../pages/ResetPassword'
import ForgetPassword from '../pages/ForgetPassword'
import Notes from '../pages/Notes'
import Navbar from '../components/Navbar'
import MainLayout from '../components/Layout/MainLayout'


const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/notes',
                element: <Notes />
            },
        ]
    },

    {
        path: '/resetPassword/:token',
        element: <ResetPassword />
    },
    {
        path: '/forgetPassword',
        element: <ForgetPassword />
    },

])

function AppRoute() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default AppRoute;