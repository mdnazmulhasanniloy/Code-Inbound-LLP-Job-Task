import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Order from "../Pages/Orders/Order";
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
                
            }
         ]
    }
])