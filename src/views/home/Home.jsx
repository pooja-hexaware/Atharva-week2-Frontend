import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {addCurrentRestaurant} from '../Restaurants/store/RestaurantsSlice';
import { Button } from '@mui/material';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const myStyle={
  backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",
  height:'120vh',
  marginTop:'-80px',
  fontSize:'50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const card = (
  <React.Fragment >
    <CardContent marginTop="1rem">
      <Typography sx={{ fontSize: 35, fontWeight:"bolder" }} color="white" variant = "h3" gutterBottom align="center">
        Good Food, Great Day
      </Typography>
      <Typography align = "center" color="white" >
          Our chefs at Wiwi make delicious food selections every week-you pick, we cook and deliver.
      </Typography>
    </CardContent>
  </React.Fragment>
);

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
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([])
    const [currentRestaurant, setCurrentRestaurant] = useState({})
    const selectedItems = useSelector((state)=>state.menus.selectedItems);

    function handleMenuClick(restaurant)
    {
        console.log("Current Restaurant", restaurant);
        setCurrentRestaurant(restaurant);
        console.log("Current Restaurant", currentRestaurant);
        dispatch(addCurrentRestaurant(restaurant));
        navigate("/menus");
    }

    const fetchRestaurants = () => {
        axios.get("http://localhost:3000/Restaurants").then(response => {
          console.log(response.data)
          setRestaurants(response.data)
        })
      }

      useEffect(() => {
        fetchRestaurants()
      }, [])

    const loading = useSelector((state) => state.loading)
    return (
      <>   
      <Button style={{position:"relative", left:"80%", top:"5%"}} float="right" variant="contained" onClick={()=>navigate("/orders")}>
        Cart {selectedItems.length}
      </Button>
    <div style={myStyle}>
      <br/><br/>
    <Container>
        <Card style={{
        background:"cover",
        backgroundColor: "#0d6efd",
        marginLeft:"12rem",
        marginRight:"12rem"
      }} gutterBottom >{card} </Card>
    </Container>  
    <Stack backgroundColor="white" marginLeft={"10rem"} marginRight={"10rem"} marginTop={"2rem"}> 
    {
          
          restaurants?.map((menuItem)=>  {
            return(
              <React.Fragment >
      <CardContent>
        <Typography sx={{ fontSize: 18  }} color="red" variant = "h3" gutterBottom fontWeight={"bold"}>
          {menuItem.name}
        </Typography>
        <Typography color="text.primary" gutterBottom>
            {menuItem.address +" "+ menuItem.pin_code}
        <Button onClick ={()=>handleMenuClick(menuItem)} variant="contained" style={{backgroundColor: "#00008b", float:"right", marginRight:"1rem"}}>View Menu</Button>
        </Typography>
        <Typography color="text.primary"  gutterBottom>
            Store : {menuItem.store_contact}
         </Typography>
      </CardContent>
    </React.Fragment>
            )
          })}
        </Stack>
    </div>

      </>
  )
}

export default Home
