const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ToppingsList from '../ToppingsList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Toppings rows when api response has data', async () => {
    const endPoint = 'toppings'
    const getToppingsListResponse = [
        {
            id: 1,
            name: 'name1',
            price: 55.84,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getToppingsListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ToppingsList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const toppingsNameCell = await screen.findByText(/name1/i)

    expect(toppingsNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
