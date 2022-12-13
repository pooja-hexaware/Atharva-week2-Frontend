import { createAsyncThunk } from '@reduxjs/toolkit'
import { id } from 'date-fns/locale'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'menus'

export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
    const response = await axios.get(`/${endPoint}`)
    const menus = await response.data
    return menus
})

export const fetchToppingsByMenu = ( (data) => {
    const response =  axios.get(`/${endPoint}/${data._id}`)
    const menus =  response.data
    return menus
})

export const addMenus = createAsyncThunk(
    'menus/addMenus',
    async (data, thunkAPI) => {
        console.log("data", data.json)
        const response = await axios.post(`/${endPoint}`, data)
        const menus = await response.data
        thunkAPI.dispatch(showSuccess('Menus added successfully'))
        return menus
    }
)

export const editMenus = createAsyncThunk(
    'menus/editMenus',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const menus = await response.data
        thunkAPI.dispatch(showSuccess('Menus updated successfully'))
        return menus
    }
)

export const deleteMenus = createAsyncThunk(
    'menus/deleteMenus',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected menus deleted successfully.')
            )
            return data.id
        }
    }
)
