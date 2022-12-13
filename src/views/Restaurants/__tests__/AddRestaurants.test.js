const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddRestaurants from '../AddRestaurants'

beforeEach(() => {
    const endPoint = 'Restaurants'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddRestaurants />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view RestaurantsAdd Component', () => {
    test('should render AddRestaurants and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addRestaurantsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const store_contactElement = screen.getByLabelText(/Store_contact/i)
        const kitchen_idElement = screen.getByLabelText(/Kitchen_id/i)
        const menuElement = screen.getByLabelText(/Menu/i)

        expect(addRestaurantsButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(pin_codeElement).toBeInTheDocument()
        expect(store_contactElement).toBeInTheDocument()
        expect(kitchen_idElement).toBeInTheDocument()
        expect(menuElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Restaurants add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const store_contactElement = screen.getByLabelText(/Store_contact/i)
        const kitchen_idElement = screen.getByLabelText(/Kitchen_id/i)
        const menuElement = screen.getByLabelText(/Menu/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(addressElement, { target: { value: 'address' } })
        fireEvent.change(pin_codeElement, { target: { value: 'pin_code' } })
        fireEvent.change(store_contactElement, {
            target: { value: 'store_contact' },
        })
        fireEvent.change(kitchen_idElement, { target: { value: 'kitchen_id' } })
        fireEvent.change(menuElement, { target: { value: 'menu' } })
    })

    test('should return error message when add Restaurants button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addRestaurantsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addRestaurantsButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(6)
    })
})
