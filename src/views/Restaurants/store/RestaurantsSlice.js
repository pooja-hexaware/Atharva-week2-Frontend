import { createSlice } from '@reduxjs/toolkit'
import { fetchRestaurants } from './Restaurants.action'
import { addRestaurants } from './Restaurants.action'
import { editRestaurants } from './Restaurants.action'
import { deleteRestaurants } from './Restaurants.action'

const fetchRestaurantsExtraReducer = {
    [fetchRestaurants.pending]: (state, action) => {
        state.loading = true
    },
    [fetchRestaurants.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchRestaurants.rejected]: (state, action) => {
        state.loading = false
    },
}

const addRestaurantsExtraReducer = {
    [addRestaurants.pending]: (state, action) => {
        state.loading = true
    },
    [addRestaurants.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addRestaurants.rejected]: (state, action) => {
        state.loading = false
    },
}

const editRestaurantsExtraReducer = {
    [editRestaurants.pending]: (state, action) => {
        state.loading = true
    },
    [editRestaurants.fulfilled]: (state, action) => {
        const { id, name, address, pin_code, store_contact, kitchen_id, menu } =
            action.payload
        const existingRestaurants = state.entities.find(
            (Restaurants) => Restaurants.id.toString() === id.toString()
        )
        if (existingRestaurants) {
            existingRestaurants.name = name
            existingRestaurants.address = address
            existingRestaurants.pin_code = pin_code
            existingRestaurants.store_contact = store_contact
            existingRestaurants.kitchen_id = kitchen_id
            existingRestaurants.menu = menu
        }
        state.loading = false
    },
    [editRestaurants.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteRestaurantsExtraReducer = {
    [deleteRestaurants.pending]: (state, action) => {
        state.loading = true
    },
    [deleteRestaurants.fulfilled]: (state, action) => {
        const id = action.payload
        const existingRestaurants = state.entities.find(
            (Restaurants) => Restaurants.id.toString() === id.toString()
        )
        if (existingRestaurants) {
            state.entities = state.entities.filter(
                (Restaurants) => Restaurants.id !== id
            )
        }
        state.loading = false
    },
    [deleteRestaurants.rejected]: (state, action) => {
        state.loading = false
    },
}
const RestaurantsSlice = createSlice({
    name: 'Restaurants',
    initialState: {
        entities: [],
        loading: false,
        currentRestaurant:{},
        currentUser:{}
    },
    reducers: {

        clearStore(state, action)
        {
            state.Restaurants= {}
        },

        addCurrentUser(state, action)
        {
            state.currentUser = action.payload;
        },

        addCurrentRestaurant(state, action)
        {
            console.log("inside action ", action.payload);
            state.currentRestaurant=action.payload;
        },
        RestaurantsAdded(state, action) {
            state.entities.push(action.payload)
        },
        RestaurantsUpdated(state, action) {
            const {
                id,
                name,
                address,
                pin_code,
                store_contact,
                kitchen_id,
                menu,
            } = action.payload
            const existingRestaurants = state.entities.find(
                (Restaurants) => Restaurants.id.toString() === id.toString()
            )
            if (existingRestaurants) {
                existingRestaurants.name = name
                existingRestaurants.address = address
                existingRestaurants.pin_code = pin_code
                existingRestaurants.store_contact = store_contact
                existingRestaurants.kitchen_id = kitchen_id
                existingRestaurants.menu = menu
            }
        },
        RestaurantsDeleted(state, action) {
            const { id } = action.payload
            const existingRestaurants = state.entities.find(
                (Restaurants) => Restaurants.id.toString() === id.toString()
            )
            if (existingRestaurants) {
                state.entities = state.entities.filter(
                    (Restaurants) => Restaurants.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchRestaurantsExtraReducer,
        ...addRestaurantsExtraReducer,
        ...editRestaurantsExtraReducer,
        ...deleteRestaurantsExtraReducer,
    },
})

export const { clearStore, addCurrentUser, addCurrentRestaurant, RestaurantsAdded, RestaurantsUpdated, RestaurantsDeleted } =
    RestaurantsSlice.actions

export default RestaurantsSlice.reducer
