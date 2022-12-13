import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';



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
      <CardContent>
        <Typography sx={{ fontSize: 35, fontWeight:"bolder" }} color="white" variant = "h3" gutterBottom align="center">
          Good Food, Great Day
        </Typography>
        <Typography align = "center" color="white" >
            Our chefs at Wiwi make delicious food selections every week-you pick, we cook and deliver.
        </Typography>
      </CardContent>
    </React.Fragment>
  );

const OrdersList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectedItems = useSelector((state)=>state.menus.selectedItems);
    const currentRestaurant = useSelector((state)=>state.Restaurants.currentRestaurant)
    const selectedToppingsNames = useSelector((state)=>state.Toppings.addSelectedToppingsNames)

    return (
        <>
      <Button style={{position:"relative", left:"10%", top: "5%"}} variant="contained" onClick={()=>navigate("/menus")}>
        Back to Menus
      </Button>
      <Button style={{position:"relative", left:"70%", top:"5%"}} variant="contained" onClick={()=>navigate("/Restaurants")}>
        Confirm Order
      </Button>
      <div style={myStyle}>
        <br/><br/>
      {/* <Container>
          <Card style={{
          background:"cover",
          backgroundColor: "#0d6efd",
          marginLeft:"12rem",
          marginRight:"12rem"
        }} gutterBottom >{card} </Card>
      </Container>   */}
      <React.Fragment >
      <CardContent align = "center" style = {{backgroundColor:"white", marginRight:"25rem", marginLeft:"25rem"}}>
        <Typography sx={{ fontSize: 18  }} color="red" variant = "h3" gutterBottom fontWeight={"bold"}>
          {currentRestaurant.name}
        </Typography>
        <Typography color="text.primary" gutterBottom>
            {currentRestaurant.address +" "+ currentRestaurant.pin_code}
            </Typography>
      </CardContent>
    </React.Fragment>
      <Stack backgroundColor="white" marginLeft={"10rem"} marginRight={"10rem"} marginTop={"2rem"}> 
        {         
          selectedItems?.map((menuItem)=>  {
            if(menuItem.price>0)
            {
            return(
              <React.Fragment >
      <CardContent>
        <Typography sx={{ fontSize: 18  }} color="text.primary" variant = "h3" gutterBottom fontWeight={"bold"}>
          {menuItem.name}
          <Typography align = 'right' sx={{ fontSize: 18  }}color = "#d2691e" variant = "h5" fontWeight={"bold"}>
          ${parseFloat(menuItem.price).toFixed(2) * parseFloat(menuItem.Amount)}
          </Typography> 
        <Typography color="text.primary" gutterBottom>
            ${(menuItem.price).toFixed(2)} x {menuItem.Amount} 
        </Typography> 
        </Typography>       
      </CardContent>
    </React.Fragment>
            )
        }
          })}
          </Stack>
      </div>

        </>
    )
}

export default OrdersList
