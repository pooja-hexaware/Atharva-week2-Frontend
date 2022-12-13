import { configureStore } from '@reduxjs/toolkit'
import OrdersReducer from '../views/Orders/store/OrdersSlice'
import ToppingsReducer from '../views/Toppings/store/ToppingsSlice'
import menusReducer from '../views/menus/store/menusSlice'
import RestaurantsReducer from '../views/Restaurants/store/RestaurantsSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Restaurants: RestaurantsReducer,
        menus: menusReducer,
        Toppings: ToppingsReducer,
        Orders: OrdersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
