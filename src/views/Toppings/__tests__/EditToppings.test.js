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
import EditToppings from '../EditToppings'
import { ToppingsAdded } from '../store/ToppingsSlice'
beforeAll(() => {
    store.dispatch(
        ToppingsAdded({
            id: 1,
            name: 'name',
            price: 26.91,
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
                                    <Navigate to="Toppings/edit/1" replace />
                                }
                            />
                            <Route
                                path="Toppings/edit/:id"
                                element={<EditToppings />}
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

describe('testing view of ToppingsEdit Component', () => {
    test('should render EditToppings and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveToppingsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(saveToppingsButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Toppings edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(priceElement, { target: { value: 83 } })

        expect(nameElement.value).toBe('name')

        expect(priceElement.value).toBe('83')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveToppingsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveToppingsButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
