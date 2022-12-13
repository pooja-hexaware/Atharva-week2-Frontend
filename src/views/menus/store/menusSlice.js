import { StaticTimePicker } from '@mui/lab'
import { createSlice } from '@reduxjs/toolkit'
import { fetchMenus } from './menus.action'
import { addMenus } from './menus.action'
import { editMenus } from './menus.action'
import { deleteMenus } from './menus.action'

const fetchMenusExtraReducer = {
    [fetchMenus.pending]: (state, action) => {
        state.loading = true
    },
    [fetchMenus.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchMenus.rejected]: (state, action) => {
        state.loading = false
    },
}

const addMenusExtraReducer = {
    [addMenus.pending]: (state, action) => {
        state.loading = true
    },
    [addMenus.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addMenus.rejected]: (state, action) => {
        state.loading = false
    },
}

const editMenusExtraReducer = {
    [editMenus.pending]: (state, action) => {
        state.loading = true
    },
    [editMenus.fulfilled]: (state, action) => {
        const { id, name, description, price, toppings } = action.payload
        const existingMenus = state.entities.find(
            (menus) => menus.id.toString() === id.toString()
        )
        if (existingMenus) {
            existingMenus.name = name
            existingMenus.description = description
            existingMenus.price = price
            existingMenus.toppings = toppings
        }
        state.loading = false
    },
    [editMenus.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteMenusExtraReducer = {
    [deleteMenus.pending]: (state, action) => {
        state.loading = true
    },
    [deleteMenus.fulfilled]: (state, action) => {
        const id = action.payload
        const existingMenus = state.entities.find(
            (menus) => menus.id.toString() === id.toString()
        )
        if (existingMenus) {
            state.entities = state.entities.filter((menus) => menus.id !== id)
        }
        state.loading = false
    },
    [deleteMenus.rejected]: (state, action) => {
        state.loading = false
    },
}
const menusSlice = createSlice({
    name: 'menus',
    initialState: {
        entities: [],
        loading: false,
        currentMenu:{},
        selectedItems:[],
    },
    reducers: {

        updateItemAmount(state, action)
        {
            state.selectedItems[action.payload.x].Amount = action.payload.amount;
        },

        addSelectedItems(state, action)
        {
            state.selectedItems.push(action.payload);
        },

        addCurrentMenu(state, action)
        {
            state.currentMenu = action.payload;
        },
        menusAdded(state, action) {
            state.entities.push(action.payload)
        },
        menusUpdated(state, action) {
            const { id, name, description, price, toppings } = action.payload
            const existingMenus = state.entities.find(
                (menus) => menus.id.toString() === id.toString()
            )
            if (existingMenus) {
                existingMenus.name = name
                existingMenus.description = description
                existingMenus.price = price
                existingMenus.toppings = toppings
            }
        },
        menusDeleted(state, action) {
            const { id } = action.payload
            const existingMenus = state.entities.find(
                (menus) => menus.id.toString() === id.toString()
            )
            if (existingMenus) {
                state.entities = state.entities.filter(
                    (menus) => menus.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchMenusExtraReducer,
        ...addMenusExtraReducer,
        ...editMenusExtraReducer,
        ...deleteMenusExtraReducer,
    },
})

export const { updateItemAmount, addSelectedItems, addCurrentMenu, menusAdded, menusUpdated, menusDeleted } = menusSlice.actions

export default menusSlice.reducer
