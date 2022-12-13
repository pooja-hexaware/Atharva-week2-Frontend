const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import MenusList from '../MenusList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Menus rows when api response has data', async () => {
    const endPoint = 'menus'
    const getMenusListResponse = [
        {
            id: 1,
            name: 'name1',
            description: 'description1',
            price: 60.22,
            toppings: 'toppings1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getMenusListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <MenusList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const menusNameCell = await screen.findByText(/name1/i)

    expect(menusNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
