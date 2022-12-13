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
import EditOrders from '../EditOrders'
import { OrdersAdded } from '../store/OrdersSlice'
beforeAll(() => {
    store.dispatch(
        OrdersAdded({
            id: 1,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 22.04,
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
                                    <Navigate to="Orders/edit/1" replace />
                                }
                            />
                            <Route
                                path="Orders/edit/:id"
                                element={<EditOrders />}
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

describe('testing view of OrdersEdit Component', () => {
    test('should render EditOrders and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOrdersButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const restaurant_idElement = screen.getByLabelText(/Restaurant_id/i)
        const userNameElement = screen.getByLabelText(/UserName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const ordered_itemsElement = screen.getByLabelText(/Ordered_items/i)
        const total_priceElement = screen.getByLabelText(/Total_price/i)

        expect(saveOrdersButtonElement).toBeInTheDocument()

        expect(restaurant_idElement).toBeInTheDocument()
        expect(userNameElement).toBeInTheDocument()
        expect(streetElement).toBeInTheDocument()
        expect(pin_codeElement).toBeInTheDocument()
        expect(ordered_itemsElement).toBeInTheDocument()
        expect(total_priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Orders edit form', async () => {
        const restaurant_idElement = screen.getByLabelText(/Restaurant_id/i)
        const userNameElement = screen.getByLabelText(/UserName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const ordered_itemsElement = screen.getByLabelText(/Ordered_items/i)
        const total_priceElement = screen.getByLabelText(/Total_price/i)

        fireEvent.change(restaurant_idElement, {
            target: { value: 'restaurant_id' },
        })
        fireEvent.change(userNameElement, { target: { value: 'userName' } })
        fireEvent.change(streetElement, { target: { value: 'street' } })
        fireEvent.change(pin_codeElement, { target: { value: 'pin_code' } })
        fireEvent.change(ordered_itemsElement, {
            target: { value: 'ordered_items' },
        })
        fireEvent.change(total_priceElement, { target: { value: 70.12 } })

        expect(restaurant_idElement.value).toBe('restaurant_id')

        expect(userNameElement.value).toBe('userName')

        expect(streetElement.value).toBe('street')

        expect(pin_codeElement.value).toBe('pin_code')

        expect(ordered_itemsElement.value).toBe('ordered_items')

        expect(total_priceElement.value).toBe('70.12')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const restaurant_idElement = screen.getByLabelText(/Restaurant_id/i)
        const userNameElement = screen.getByLabelText(/UserName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const ordered_itemsElement = screen.getByLabelText(/Ordered_items/i)
        const total_priceElement = screen.getByLabelText(/Total_price/i)

        fireEvent.change(restaurant_idElement, { target: { value: '' } })
        fireEvent.change(userNameElement, { target: { value: '' } })
        fireEvent.change(streetElement, { target: { value: '' } })
        fireEvent.change(pin_codeElement, { target: { value: '' } })
        fireEvent.change(ordered_itemsElement, { target: { value: '' } })
        fireEvent.change(total_priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOrdersButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOrdersButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(6)
    })
})
