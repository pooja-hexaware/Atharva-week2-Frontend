import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchMenus, addMenus, editMenus, deleteMenus } from '../menus.action'

const getMenusListResponse = [
    {
        id: 1,
        name: 'name',
        description: 'description',
        price: 29.89,
        toppings: 'toppings',
    },
]

const addMenusListResponse = (data) => {
    return { id: 2, ...data }
}
const editMenusListResponse = (data) => {
    return data
}

describe('should test Menus redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'menus'
    test('Should be able to fetch the menus list and update menus redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getMenusListResponse)
        const result = await store.dispatch(fetchMenus())
        const menusList = result.payload
        expect(result.type).toBe('menus/fetchMenus/fulfilled')
        expect(menusList).toEqual(getMenusListResponse)

        const state = store.getState().menus
        expect(state.entities).toEqual(menusList)
    })

    test('Should be able to add new menus to list and make post api and update menus redux store', async () => {
        const body = {
            name: 'name',
            description: 'description',
            price: 54.08,
            toppings: 'toppings',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addMenusListResponse(body))
        const result = await store.dispatch(addMenus(body))
        const menusItem = result.payload
        expect(result.type).toBe('menus/addMenus/fulfilled')
        expect(menusItem).toEqual(addMenusListResponse(body))

        const state = store.getState().menus
        expect(state.entities).toContainEqual(addMenusListResponse(body))
    })

    test('Should be able to edit menus in list and make put api call and update menus redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            description: 'description',
            price: 30.48,
            toppings: 'toppings',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editMenusListResponse(body)
        )
        const result = await store.dispatch(editMenus(body))
        const menusItem = result.payload
        expect(result.type).toBe('menus/editMenus/fulfilled')
        expect(menusItem).toEqual(editMenusListResponse(body))

        const state = store.getState().menus
        let changedMenus = state.entities.find((p) => p.id === body.id)
        expect(changedMenus.name).toEqual(body.name)
    })

    test('Should be able to delete menus in list and update menus redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().menus
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteMenus(input))
        const deletId = result.payload
        expect(result.type).toBe('menus/deleteMenus/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().menus
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
