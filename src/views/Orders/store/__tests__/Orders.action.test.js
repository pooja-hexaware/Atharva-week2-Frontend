import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchOrders,
    addOrders,
    editOrders,
    deleteOrders,
} from '../orders.action'

const getOrdersListResponse = [
    {
        id: 1,
        restaurant_id: 'restaurant_id',
        userName: 'userName',
        street: 'street',
        pin_code: 'pin_code',
        ordered_items: 'ordered_items',
        total_price: 99.01,
    },
]

const addOrdersListResponse = (data) => {
    return { id: 2, ...data }
}
const editOrdersListResponse = (data) => {
    return data
}

describe('should test Orders redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'orders'
    test('Should be able to fetch the orders list and update orders redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getOrdersListResponse)
        const result = await store.dispatch(fetchOrders())
        const ordersList = result.payload
        expect(result.type).toBe('orders/fetchOrders/fulfilled')
        expect(ordersList).toEqual(getOrdersListResponse)

        const state = store.getState().orders
        expect(state.entities).toEqual(ordersList)
    })

    test('Should be able to add new orders to list and make post api and update orders redux store', async () => {
        const body = {
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 100.88,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addOrdersListResponse(body)
        )
        const result = await store.dispatch(addOrders(body))
        const ordersItem = result.payload
        expect(result.type).toBe('orders/addOrders/fulfilled')
        expect(ordersItem).toEqual(addOrdersListResponse(body))

        const state = store.getState().orders
        expect(state.entities).toContainEqual(addOrdersListResponse(body))
    })

    test('Should be able to edit orders in list and make put api call and update orders redux store', async () => {
        const body = {
            id: 1,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 75.62,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editOrdersListResponse(body)
        )
        const result = await store.dispatch(editOrders(body))
        const ordersItem = result.payload
        expect(result.type).toBe('orders/editOrders/fulfilled')
        expect(ordersItem).toEqual(editOrdersListResponse(body))

        const state = store.getState().orders
        let changedOrders = state.entities.find((p) => p.id === body.id)
        expect(changedOrders.name).toEqual(body.name)
    })

    test('Should be able to delete orders in list and update orders redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().orders
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteOrders(input))
        const deletId = result.payload
        expect(result.type).toBe('orders/deleteOrders/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().orders
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
