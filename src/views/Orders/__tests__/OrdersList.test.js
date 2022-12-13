const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import OrdersList from '../OrdersList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Orders rows when api response has data', async () => {
    const endPoint = 'orders'
    const getOrdersListResponse = [
        {
            id: 1,
            restaurant_id: 'restaurant_id1',
            userName: 'userName1',
            street: 'street1',
            pin_code: 'pin_code1',
            ordered_items: 'ordered_items1',
            total_price: 76.25,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOrdersListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OrdersList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const ordersRestaurant_idCell = await screen.findByText(/restaurant_id1/i)

    expect(ordersRestaurant_idCell).toHaveTextContent(/restaurant_id1/i)
    mock.reset()
})
