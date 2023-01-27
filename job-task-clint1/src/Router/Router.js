import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Order from "../Pages/Orders/Order";
import Register from "../Pages/Register/Register";
import CustomerSurvey from './../Pages/CustomerSurvey/CustomerSurvey';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
         children:[
            {
                path: '/',
                element:<Order />
                
            },
            {
                path: '/customarySurvey',
                element:<CustomerSurvey />
            },
                
            {
                path: '/login',
                element:<Login />
            },
                
            {
                path: '/register',
                element:<Register />
            }
         ]
    }
])