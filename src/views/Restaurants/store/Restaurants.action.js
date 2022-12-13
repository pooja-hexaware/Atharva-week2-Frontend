import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Restaurants'

export const fetchRestaurants = createAsyncThunk(
    'Restaurants/fetchRestaurants',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Restaurants = await response.data
        return Restaurants
    }
)

export const fetchMenuByRestaurant = ( (data) => {
    console.log("fetchMenuByRestaurant", `/${endPoint}/${data.currentRestaurant._id}`);
    const response =  axios.get("http://localhost:3000/Restaurants/", `${data.currentRestaurant._id}`)
    const menus =  response.data
    return menus
})

export const addRestaurants = createAsyncThunk(
    'Restaurants/addRestaurants',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Restaurants = await response.data
        thunkAPI.dispatch(showSuccess('Restaurants added successfully'))
        return Restaurants
    }
)

export const editRestaurants = createAsyncThunk(
    'Restaurants/editRestaurants',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Restaurants = await response.data
        thunkAPI.dispatch(showSuccess('Restaurants updated successfully'))
        return Restaurants
    }
)

export const deleteRestaurants = createAsyncThunk(
    'Restaurants/deleteRestaurants',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Restaurants deleted successfully.')
            )
            return data.id
        }
    }
)
