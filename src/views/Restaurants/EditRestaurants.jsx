import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editRestaurants } from './store/Restaurants.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditRestaurants = () => {
    const { id: RestaurantsId } = useParams()

    const Restaurants = useSelector((state) =>
        state.Restaurants.entities.find(
            (Restaurants) =>
                Restaurants.id.toString() === RestaurantsId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(Restaurants.name)
    const [address, setAddress] = useState(Restaurants.address)
    const [pin_code, setPin_code] = useState(Restaurants.pin_code)
    const [store_contact, setStore_contact] = useState(
        Restaurants.store_contact
    )
    const [kitchen_id, setKitchen_id] = useState(Restaurants.kitchen_id)
    const [menu, setMenu] = useState(Restaurants.menu)

    const handleName = (e) => setName(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)
    const handlePin_code = (e) => setPin_code(e.target.value)
    const handleStore_contact = (e) => setStore_contact(e.target.value)
    const handleKitchen_id = (e) => setKitchen_id(e.target.value)
    const handleMenu = (e) => setMenu(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editRestaurants({
                id: RestaurantsId,
                name,
                address,
                pin_code,
                store_contact,
                kitchen_id,
                menu,
            })
        )
        navigate('/Restaurants')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditRestaurants', path: '/Restaurants' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="pin_code"
                                id="pin_codeInput"
                                onChange={handlePin_code}
                                value={pin_code}
                                validators={['required']}
                                label="Pin_code"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="store_contact"
                                id="store_contactInput"
                                onChange={handleStore_contact}
                                value={store_contact}
                                validators={['required']}
                                label="Store_contact"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="kitchen_id"
                                id="kitchen_idInput"
                                onChange={handleKitchen_id}
                                value={kitchen_id}
                                validators={['required']}
                                label="Kitchen_id"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="menu"
                                id="menuInput"
                                onChange={handleMenu}
                                value={menu}
                                validators={['required']}
                                label="Menu"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditRestaurants
