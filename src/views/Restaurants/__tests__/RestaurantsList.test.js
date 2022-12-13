const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import RestaurantsList from '../RestaurantsList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Restaurants rows when api response has data', async () => {
    const endPoint = 'restaurants'
    const getRestaurantsListResponse = [
        {
            id: 1,
            name: 'name1',
            address: 'address1',
            pin_code: 'pin_code1',
            store_contact: 'store_contact1',
            kitchen_id: 'kitchen_id1',
            menu: 'menu1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getRestaurantsListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <RestaurantsList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const restaurantsNameCell = await screen.findByText(/name1/i)

    expect(restaurantsNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
