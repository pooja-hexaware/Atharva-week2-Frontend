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
import AddToppings from '../AddToppings'

beforeEach(() => {
    const endPoint = 'Toppings'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            price: 75.04,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddToppings />
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

describe('testing view ToppingsAdd Component', () => {
    test('should render AddToppings and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addToppingsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(addToppingsButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Toppings add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(priceElement, { target: { value: 55.61 } })
    })

    test('should return error message when add Toppings button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addToppingsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addToppingsButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
