import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { Button} from '@mui/material'
import axios from 'axios';
import { useState } from 'react'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {addSelectedToppings, addSelectedToppingsNames} from './store/ToppingsSlice'

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

const ToppingsList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentMenu = useSelector((state)=>state.menus.currentMenu)
    const [toppings, setToppings] = useState([])

    const fetchToppings=()=>{
        axios.get("http://localhost:3000/menus/"+currentMenu._id).then(response => {
            console.log(response.data[0].toppings)
            setToppings(response.data[0].toppings)
          })
    }

    useEffect(() => {
        fetchToppings()
    }, [])

    function handleAdd(toppingItem)
    {
      dispatch(addSelectedToppings(toppingItem))
      dispatch(addSelectedToppingsNames(toppingItem.name))
      alert("added")
    }

    return (
        <>          
          <Button style={{position:"relative", left:"10%", top: "5%"}} variant="contained" onClick={()=>navigate("/menus")}>
            Back to Menu
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
              
              toppings?.map((toppingItem)=>  {
                return(
                  <React.Fragment >
          <CardContent>
            <Typography sx={{ fontSize: 18  }} color="text.primary" variant = "h3" gutterBottom fontWeight={"bold"}>
              {toppingItem.name}
              <Button onClick={()=>handleAdd(toppingItem)} variant="contained" style={{backgroundColor: "#00008b", float:"right", marginRight:"1rem"}}>+ Add</Button>
            </Typography>
            
            <Typography sx={{ fontSize: 18  }}color = "#d2691e" variant = "h5" fontWeight={"bold"}>
              ${toppingItem.price}
            </Typography>
          </CardContent>
        </React.Fragment>
                )
              })}
              </Stack>
          </div>
        </>
      );
}

export default ToppingsList
