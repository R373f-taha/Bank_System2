import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Careers from '../pages/Careers';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Security from '../pages/Security';
import RootLayout from '../components/sharedComponents/layOut/RootLayout';

export const router = createBrowserRouter([{
    path:'/',
    element:<RootLayout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:'about',
            element:<About/>
        },
        {
            path:'careers',
            element:<Careers/>
        },
        {
            path:'security',
            element:<Security/>
        },
        {
            path:'login',
            element:<LogIn/>    
        },
        {
        path:'signup',
        element:<SignUp />
        }
    ]
}])