const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditRestaurants from '../EditRestaurants'
import { RestaurantsAdded } from '../store/RestaurantsSlice'
beforeAll(() => {
    store.dispatch(
        RestaurantsAdded({
            id: 1,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Restaurants/edit/1" replace />
                                }
                            />
                            <Route
                                path="Restaurants/edit/:id"
                                element={<EditRestaurants />}
                            />
                        </Routes>
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

describe('testing view of RestaurantsEdit Component', () => {
    test('should render EditRestaurants and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveRestaurantsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const store_contactElement = screen.getByLabelText(/Store_contact/i)
        const kitchen_idElement = screen.getByLabelText(/Kitchen_id/i)
        const menuElement = screen.getByLabelText(/Menu/i)

        expect(saveRestaurantsButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(pin_codeElement).toBeInTheDocument()
        expect(store_contactElement).toBeInTheDocument()
        expect(kitchen_idElement).toBeInTheDocument()
        expect(menuElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Restaurants edit form', async () => {
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

        expect(nameElement.value).toBe('name')

        expect(addressElement.value).toBe('address')

        expect(pin_codeElement.value).toBe('pin_code')

        expect(store_contactElement.value).toBe('store_contact')

        expect(kitchen_idElement.value).toBe('kitchen_id')

        expect(menuElement.value).toBe('menu')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const store_contactElement = screen.getByLabelText(/Store_contact/i)
        const kitchen_idElement = screen.getByLabelText(/Kitchen_id/i)
        const menuElement = screen.getByLabelText(/Menu/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(addressElement, { target: { value: '' } })
        fireEvent.change(pin_codeElement, { target: { value: '' } })
        fireEvent.change(store_contactElement, { target: { value: '' } })
        fireEvent.change(kitchen_idElement, { target: { value: '' } })
        fireEvent.change(menuElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveRestaurantsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveRestaurantsButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(6)
    })
})
