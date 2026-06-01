import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import RootLayout from '../components/sharedComponents/layOut/RootLayout';
import Dashboard from '../pages/Dashboard';
import CreatAccount from "../pages/CreatAccount"; 
import AdminDashboard from '../pages/AdminDashboard';
import VerifyAccount from '../pages/VerifyAccount';


export const router = createBrowserRouter([{
    path:'/',
    element:<RootLayout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:'login',
            element:<LogIn/>    
        },
        {
        path:'signup',
        element:<CreatAccount />
        },
        {
            path:'dashboard',   
            element:<Dashboard />
        },
        {
            path: 'admin/dashboard',
            element: <AdminDashboard /> 
        },
        {
            path:"verify-account",
            element:<VerifyAccount/>
        }
    ]
}])