import { createSlice } from '@reduxjs/toolkit'
import { fetchToppings } from './Toppings.action'
import { addToppings } from './Toppings.action'
import { editToppings } from './Toppings.action'
import { deleteToppings } from './Toppings.action'

const fetchToppingsExtraReducer = {
    [fetchToppings.pending]: (state, action) => {
        state.loading = true
    },
    [fetchToppings.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const addToppingsExtraReducer = {
    [addToppings.pending]: (state, action) => {
        state.loading = true
    },
    [addToppings.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const editToppingsExtraReducer = {
    [editToppings.pending]: (state, action) => {
        state.loading = true
    },
    [editToppings.fulfilled]: (state, action) => {
        const { id, name, price } = action.payload
        const existingToppings = state.entities.find(
            (Toppings) => Toppings.id.toString() === id.toString()
        )
        if (existingToppings) {
            existingToppings.name = name
            existingToppings.price = price
        }
        state.loading = false
    },
    [editToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteToppingsExtraReducer = {
    [deleteToppings.pending]: (state, action) => {
        state.loading = true
    },
    [deleteToppings.fulfilled]: (state, action) => {
        const id = action.payload
        const existingToppings = state.entities.find(
            (Toppings) => Toppings.id.toString() === id.toString()
        )
        if (existingToppings) {
            state.entities = state.entities.filter(
                (Toppings) => Toppings.id !== id
            )
        }
        state.loading = false
    },
    [deleteToppings.rejected]: (state, action) => {
        state.loading = false
    },
}
const ToppingsSlice = createSlice({
    name: 'Toppings',
    initialState: {
        entities: [],
        loading: false,
        selectedToppings:[],
        selectedToppingsNames:[],
    },
    reducers: {
        
        addSelectedToppings(state, action)
        {
            state.selectedToppings.push(action.payload);
        },
        addSelectedToppingsNames(state, action)
        {
            state.selectedToppingsNames.push(action.payload);
        },
        ToppingsAdded(state, action) {
            state.entities.push(action.payload)
        },
        ToppingsUpdated(state, action) {
            const { id, name, price } = action.payload
            const existingToppings = state.entities.find(
                (Toppings) => Toppings.id.toString() === id.toString()
            )
            if (existingToppings) {
                existingToppings.name = name
                existingToppings.price = price
            }
        },
        ToppingsDeleted(state, action) {
            const { id } = action.payload
            const existingToppings = state.entities.find(
                (Toppings) => Toppings.id.toString() === id.toString()
            )
            if (existingToppings) {
                state.entities = state.entities.filter(
                    (Toppings) => Toppings.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchToppingsExtraReducer,
        ...addToppingsExtraReducer,
        ...editToppingsExtraReducer,
        ...deleteToppingsExtraReducer,
    },
})

export const { addSelectedToppingsNames, deleteAllSelectedToppings, addSelectedToppings, ToppingsAdded, ToppingsUpdated, ToppingsDeleted } =
    ToppingsSlice.actions

export default ToppingsSlice.reducer
