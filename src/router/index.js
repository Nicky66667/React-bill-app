import { Route, createBrowserRouter } from "react-router-dom";
import Month from "../pages/month";
import Year from "../pages/year";
import New from "../pages/new";
import Layout from "../pages/layout";
import dayjs from "dayjs";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/month',
                element: <Month />
            },
            {
                path: '/year',
                element: <Year />
            },
        ]
    },
    {
        path: '/new',
        element: <New />
    },


])

export default Router