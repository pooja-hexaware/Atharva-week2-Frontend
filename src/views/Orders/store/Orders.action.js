import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Orders'

export const fetchOrders = createAsyncThunk('Orders/fetchOrders', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Orders = await response.data
    return Orders
})

export const addOrders = createAsyncThunk(
    'Orders/addOrders',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Orders = await response.data
        thunkAPI.dispatch(showSuccess('Orders added successfully'))
        return Orders
    }
)

export const editOrders = createAsyncThunk(
    'Orders/editOrders',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Orders = await response.data
        thunkAPI.dispatch(showSuccess('Orders updated successfully'))
        return Orders
    }
)

export const deleteOrders = createAsyncThunk(
    'Orders/deleteOrders',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Orders deleted successfully.')
            )
            return data.id
        }
    }
)
