import store from 'store/store'
import {
    restaurantsAdded,
    restaurantsDeleted,
    restaurantsUpdated,
} from '../restaurantsSlice'

describe('testing restaurants redux store reducers', () => {
    test('add restaurants to store test', () => {
        let state = store.getState().restaurants
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        }
        store.dispatch(restaurantsAdded(initialInput))
        state = store.getState().restaurants
        expect(state.entities).toHaveLength(1)
    })

    test('update restaurants from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        }
        store.dispatch(restaurantsAdded(initialInput))
        let state = store.getState().restaurants
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            address: 'address1',
            pin_code: 'pin_code1',
            store_contact: 'store_contact1',
            kitchen_id: 'kitchen_id1',
            menu: 'menu1',
        }
        store.dispatch(restaurantsUpdated(updatedInput))
        state = store.getState().restaurants
        let changedRestaurants = state.entities.find((p) => p.id === 2)
        expect(changedRestaurants).toStrictEqual(updatedInput)
    })

    test('delete restaurants from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            address: 'address',
            pin_code: 'pin_code',
            store_contact: 'store_contact',
            kitchen_id: 'kitchen_id',
            menu: 'menu',
        }
        store.dispatch(restaurantsAdded(initialInput))
        let state = store.getState().restaurants
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            restaurantsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().restaurants
        expect(state.entities).toHaveLength(2)
    })
})
