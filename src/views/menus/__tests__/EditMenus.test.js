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
import EditMenus from '../EditMenus'
import { menusAdded } from '../store/menusSlice'
beforeAll(() => {
    store.dispatch(
        menusAdded({
            id: 1,
            name: 'name',
            description: 'description',
            price: 69.21,
            toppings: 'toppings',
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
                                element={<Navigate to="menus/edit/1" replace />}
                            />
                            <Route
                                path="menus/edit/:id"
                                element={<EditMenus />}
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

describe('testing view of MenusEdit Component', () => {
    test('should render EditMenus and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveMenusButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        expect(saveMenusButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(toppingsElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Menus edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
        fireEvent.change(priceElement, { target: { value: 64.27 } })
        fireEvent.change(toppingsElement, { target: { value: 'toppings' } })

        expect(nameElement.value).toBe('name')

        expect(descriptionElement.value).toBe('description')

        expect(priceElement.value).toBe('64.27')
        expect(toppingsElement.value).toBe('toppings')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        fireEvent.change(toppingsElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveMenusButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveMenusButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
