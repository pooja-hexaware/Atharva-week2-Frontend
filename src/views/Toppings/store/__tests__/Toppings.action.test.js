import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchToppings,
    addToppings,
    editToppings,
    deleteToppings,
} from '../toppings.action'

const getToppingsListResponse = [
    {
        id: 1,
        name: 'name',
        price: 1.49,
    },
]

const addToppingsListResponse = (data) => {
    return { id: 2, ...data }
}
const editToppingsListResponse = (data) => {
    return data
}

describe('should test Toppings redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'toppings'
    test('Should be able to fetch the toppings list and update toppings redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getToppingsListResponse)
        const result = await store.dispatch(fetchToppings())
        const toppingsList = result.payload
        expect(result.type).toBe('toppings/fetchToppings/fulfilled')
        expect(toppingsList).toEqual(getToppingsListResponse)

        const state = store.getState().toppings
        expect(state.entities).toEqual(toppingsList)
    })

    test('Should be able to add new toppings to list and make post api and update toppings redux store', async () => {
        const body = {
            name: 'name',
            price: 11.68,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addToppingsListResponse(body)
        )
        const result = await store.dispatch(addToppings(body))
        const toppingsItem = result.payload
        expect(result.type).toBe('toppings/addToppings/fulfilled')
        expect(toppingsItem).toEqual(addToppingsListResponse(body))

        const state = store.getState().toppings
        expect(state.entities).toContainEqual(addToppingsListResponse(body))
    })

    test('Should be able to edit toppings in list and make put api call and update toppings redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            price: 92.64,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editToppingsListResponse(body)
        )
        const result = await store.dispatch(editToppings(body))
        const toppingsItem = result.payload
        expect(result.type).toBe('toppings/editToppings/fulfilled')
        expect(toppingsItem).toEqual(editToppingsListResponse(body))

        const state = store.getState().toppings
        let changedToppings = state.entities.find((p) => p.id === body.id)
        expect(changedToppings.name).toEqual(body.name)
    })

    test('Should be able to delete toppings in list and update toppings redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().toppings
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteToppings(input))
        const deletId = result.payload
        expect(result.type).toBe('toppings/deleteToppings/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().toppings
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
