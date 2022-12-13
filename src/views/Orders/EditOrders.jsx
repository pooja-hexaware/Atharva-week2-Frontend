import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editOrders } from './store/Orders.action'
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

const EditOrders = () => {
    const { id: OrdersId } = useParams()

    const Orders = useSelector((state) =>
        state.Orders.entities.find(
            (Orders) => Orders.id.toString() === OrdersId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [restaurant_id, setRestaurant_id] = useState(Orders.restaurant_id)
    const [userName, setUserName] = useState(Orders.userName)
    const [street, setStreet] = useState(Orders.street)
    const [pin_code, setPin_code] = useState(Orders.pin_code)
    const [ordered_items, setOrdered_items] = useState(Orders.ordered_items)
    const [total_price, setTotal_price] = useState(Orders.total_price)

    const handleRestaurant_id = (e) => setRestaurant_id(e.target.value)
    const handleUserName = (e) => setUserName(e.target.value)
    const handleStreet = (e) => setStreet(e.target.value)
    const handlePin_code = (e) => setPin_code(e.target.value)
    const handleOrdered_items = (e) => setOrdered_items(e.target.value)
    const handleTotal_price = (e) => setTotal_price(parseFloat(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editOrders({
                id: OrdersId,
                restaurant_id,
                userName,
                street,
                pin_code,
                ordered_items,
                total_price,
            })
        )
        navigate('/Orders')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditOrders', path: '/Orders' },
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
                                name="restaurant_id"
                                id="restaurant_idInput"
                                onChange={handleRestaurant_id}
                                value={restaurant_id}
                                validators={['required']}
                                label="Restaurant_id"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="userName"
                                id="userNameInput"
                                onChange={handleUserName}
                                value={userName}
                                validators={['required']}
                                label="UserName"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="street"
                                id="streetInput"
                                onChange={handleStreet}
                                value={street}
                                validators={['required']}
                                label="Street"
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
                                name="ordered_items"
                                id="ordered_itemsInput"
                                onChange={handleOrdered_items}
                                value={ordered_items}
                                validators={['required']}
                                label="Ordered_items"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="total_price"
                                id="total_priceInput"
                                onChange={handleTotal_price}
                                value={total_price || ''}
                                validators={['required']}
                                label="Total_price"
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

export default EditOrders
