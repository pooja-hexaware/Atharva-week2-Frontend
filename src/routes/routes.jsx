import NotFound from 'views/sessions/NotFound'
import OrdersRoutes from 'views/Orders/OrdersRoutes'
import ToppingsRoutes from 'views/Toppings/ToppingsRoutes'
import menusRoutes from 'views/menus/MenusRoutes'
import RestaurantsRoutes from 'views/Restaurants/RestaurantsRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...RestaurantsRoutes,
                ...menusRoutes,
                ...ToppingsRoutes,
                ...OrdersRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
