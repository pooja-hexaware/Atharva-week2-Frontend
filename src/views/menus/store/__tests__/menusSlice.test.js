import store from 'store/store'
import { menusAdded, menusDeleted, menusUpdated } from '../menusSlice'

describe('testing menus redux store reducers', () => {
    test('add menus to store test', () => {
        let state = store.getState().menus
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            description: 'description',
            price: 34.43,
            toppings: 'toppings',
        }
        store.dispatch(menusAdded(initialInput))
        state = store.getState().menus
        expect(state.entities).toHaveLength(1)
    })

    test('update menus from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            description: 'description',
            price: 15.97,
            toppings: 'toppings',
        }
        store.dispatch(menusAdded(initialInput))
        let state = store.getState().menus
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            description: 'description1',
            price: 61.78,
            toppings: 'toppings1',
        }
        store.dispatch(menusUpdated(updatedInput))
        state = store.getState().menus
        let changedMenus = state.entities.find((p) => p.id === 2)
        expect(changedMenus).toStrictEqual(updatedInput)
    })

    test('delete menus from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            description: 'description',
            price: 54.22,
            toppings: 'toppings',
        }
        store.dispatch(menusAdded(initialInput))
        let state = store.getState().menus
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            menusDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().menus
        expect(state.entities).toHaveLength(2)
    })
})
