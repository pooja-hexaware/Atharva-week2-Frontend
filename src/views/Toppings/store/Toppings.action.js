import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Toppings'

export const fetchToppings = createAsyncThunk(
    'Toppings/fetchToppings',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Toppings = await response.data
        return Toppings
    }
)

export const addToppings = createAsyncThunk(
    'Toppings/addToppings',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Toppings = await response.data
        thunkAPI.dispatch(showSuccess('Toppings added successfully'))
        return Toppings
    }
)

export const editToppings = createAsyncThunk(
    'Toppings/editToppings',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Toppings = await response.data
        thunkAPI.dispatch(showSuccess('Toppings updated successfully'))
        return Toppings
    }
)

export const deleteToppings = createAsyncThunk(
    'Toppings/deleteToppings',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Toppings deleted successfully.')
            )
            return data.id
        }
    }
)
