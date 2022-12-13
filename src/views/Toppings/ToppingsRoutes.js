import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ToppingsList = Loadable(lazy(() => import('./ToppingsList')))
const EditToppings = Loadable(lazy(() => import('./EditToppings')))
const AddToppings = Loadable(lazy(() => import('./AddToppings')))

const ToppingsRoutes = [
    {
        path: '/Toppings',
        element: <ToppingsList />,
    },
    {
        path: '/Toppings/edit/:id',
        element: <EditToppings />,
    },
    {
        path: '/Toppings/add',
        element: <AddToppings />,
    },
]

export default ToppingsRoutes
