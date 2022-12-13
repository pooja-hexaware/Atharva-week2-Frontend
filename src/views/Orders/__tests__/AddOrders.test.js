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
import AddOrders from '../AddOrders'

beforeEach(() => {
    const endPoint = 'Orders'
    const getStudentListResponse = [
        {
            id: 1,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 76.57,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddOrders />
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

describe('testing view OrdersAdd Component', () => {
    test('should render AddOrders and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addOrdersButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const restaurant_idElement = screen.getByLabelText(/Restaurant_id/i)
        const userNameElement = screen.getByLabelText(/UserName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const pin_codeElement = screen.getByLabelText(/Pin_code/i)
        const ordered_itemsElement = screen.getByLabelText(/Ordered_items/i)
        const total_priceElement = screen.getByLabelText(/Total_price/i)

        expect(addOrdersButtonElement).toBeInTheDocument()

        expect(restaurant_idElement).toBeInTheDocument()
        expect(userNameElement).toBeInTheDocument()
        expect(streetElement).toBeInTheDocument()
        expect(pin_codeElement).toBeInTheDocument()
        expect(ordered_itemsElement).toBeInTheDocument()
        expect(total_priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Orders add form', async () => {
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
        fireEvent.change(total_priceElement, { target: { value: 3.59 } })
    })

    test('should return error message when add Orders button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addOrdersButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addOrdersButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(6)
    })
})
