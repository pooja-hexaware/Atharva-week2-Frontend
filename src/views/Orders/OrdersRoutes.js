import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const OrdersList = Loadable(lazy(() => import('./OrdersList')))
const EditOrders = Loadable(lazy(() => import('./EditOrders')))
const AddOrders = Loadable(lazy(() => import('./AddOrders')))

const OrdersRoutes = [
    {
        path: '/Orders',
        element: <OrdersList />,
    },
    {
        path: '/Orders/edit/:id',
        element: <EditOrders />,
    },
    {
        path: '/Orders/add',
        element: <AddOrders />,
    },
]

export default OrdersRoutes
