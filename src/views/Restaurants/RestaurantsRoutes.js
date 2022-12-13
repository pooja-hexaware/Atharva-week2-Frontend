import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const RestaurantsList = Loadable(lazy(() => import('./RestaurantsList')))
const EditRestaurants = Loadable(lazy(() => import('./EditRestaurants')))
const AddRestaurants = Loadable(lazy(() => import('./AddRestaurants')))

const RestaurantsRoutes = [
    {
        path: '/Restaurants',
        element: <RestaurantsList />,
    },
    {
        path: '/Restaurants/edit/:id',
        element: <EditRestaurants />,
    },
    {
        path: '/Restaurants/add',
        element: <AddRestaurants />,
    },
]

export default RestaurantsRoutes
