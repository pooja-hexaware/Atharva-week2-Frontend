import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const MenusList = Loadable(lazy(() => import('./MenusList')))
const EditMenus = Loadable(lazy(() => import('./EditMenus')))
const AddMenus = Loadable(lazy(() => import('./AddMenus')))

const menusRoutes = [
    {
        path: '/menus',
        element: <MenusList />,
    },
    {
        path: '/menus/edit/:id',
        element: <EditMenus />,
    },
    {
        path: '/menus/add',
        element: <AddMenus />,
    },
]

export default menusRoutes
