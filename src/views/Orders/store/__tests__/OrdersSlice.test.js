import store from 'store/store'
import { ordersAdded, ordersDeleted, ordersUpdated } from '../ordersSlice'

describe('testing orders redux store reducers', () => {
    test('add orders to store test', () => {
        let state = store.getState().orders
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 20.44,
        }
        store.dispatch(ordersAdded(initialInput))
        state = store.getState().orders
        expect(state.entities).toHaveLength(1)
    })

    test('update orders from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 25.76,
        }
        store.dispatch(ordersAdded(initialInput))
        let state = store.getState().orders
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            restaurant_id: 'restaurant_id1',
            userName: 'userName1',
            street: 'street1',
            pin_code: 'pin_code1',
            ordered_items: 'ordered_items1',
            total_price: 55.31,
        }
        store.dispatch(ordersUpdated(updatedInput))
        state = store.getState().orders
        let changedOrders = state.entities.find((p) => p.id === 2)
        expect(changedOrders).toStrictEqual(updatedInput)
    })

    test('delete orders from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            restaurant_id: 'restaurant_id',
            userName: 'userName',
            street: 'street',
            pin_code: 'pin_code',
            ordered_items: 'ordered_items',
            total_price: 86.21,
        }
        store.dispatch(ordersAdded(initialInput))
        let state = store.getState().orders
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            ordersDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().orders
        expect(state.entities).toHaveLength(2)
    })
})
