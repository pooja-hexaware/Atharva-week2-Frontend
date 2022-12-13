import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchRestaurants,
    addRestaurants,
    editRestaurants,
    deleteRestaurants,
} from '../restaurants.action'

const getRestaurantsListResponse = [
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

const addRestaurantsListResponse = (data) => {
    return { id: 2, ...data }
}
const editRestaurantsListResponse = (data) => {
    return data
}

describe('should test Restaurants redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'restaurants'
    test('Should be able to fetch the restaurants list and update restaurants redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getRestaurantsListResponse)
        const result = await store.dispatch(fetchRestaurants())
        const restaurantsList = result.payload
        expect(result.type).toBe('restaurants/fetchRestaurants/fulfilled')
        expect(restaurantsList).toEqual(getRestaurantsListResponse)

        const state = store.getState().restaurants
        expect(state.entities).toEqual(restaurantsList)
    })

    test('Should be able to add new restaurants to list and make post api and update restaurants redux store', async () => {
        const body = {
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addRestaurantsListResponse(body)
        )
        const result = await store.dispatch(addRestaurants(body))
        const restaurantsItem = result.payload
        expect(result.type).toBe('restaurants/addRestaurants/fulfilled')
        expect(restaurantsItem).toEqual(addRestaurantsListResponse(body))

        const state = store.getState().restaurants
        expect(state.entities).toContainEqual(addRestaurantsListResponse(body))
    })

    test('Should be able to edit restaurants in list and make put api call and update restaurants redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editRestaurantsListResponse(body)
        )
        const result = await store.dispatch(editRestaurants(body))
        const restaurantsItem = result.payload
        expect(result.type).toBe('restaurants/editRestaurants/fulfilled')
        expect(restaurantsItem).toEqual(editRestaurantsListResponse(body))

        const state = store.getState().restaurants
        let changedRestaurants = state.entities.find((p) => p.id === body.id)
        expect(changedRestaurants.name).toEqual(body.name)
    })

    test('Should be able to delete restaurants in list and update restaurants redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().restaurants
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteRestaurants(input))
        const deletId = result.payload
        expect(result.type).toBe('restaurants/deleteRestaurants/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().restaurants
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
