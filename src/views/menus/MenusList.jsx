import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { useState } from 'react'
import axios from 'axios'
import {addCurrentMenu, addSelectedItems, updateItemAmount} from './store/menusSlice'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {deleteAllSelectedToppings} from '../Toppings/store/ToppingsSlice'

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

const MenusList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menu, setMenu] = useState([]);
    const loading = useSelector((state) => state.menus.loading)
    const currentRestaurant= useSelector((state)=>state.Restaurants.currentRestaurant)
    const [currentMenu, setCurrentMenu] = useState({})
    const [selectedItem, setSelectedItem]=useState({});
    const [Amount, setAmount] = useState("1");
    const selectedToppings = useSelector(state=>state.Toppings.selectedToppings);
    const selectedItems = useSelector((state)=>state.menus.selectedItems);


    const fetchMenus=()=>{
        axios.get("http://localhost:3000/Restaurants/"+currentRestaurant._id).then(response => {
            console.log(response.data[0].menu)
            setMenu(response.data[0].menu)
          })
    }

    useEffect(() => {
        fetchMenus();
    }, [])

    function handleToppingsClick(menuItem)
    {
        setCurrentMenu(menuItem);
        dispatch(addCurrentMenu(menuItem));
        navigate("/Toppings");
    }

    function isPresent(menuItem)
    {
      let x = -1;
      for(let i=0;i<selectedItems.length;i++)
      {
        if((selectedItems[i].id===menuItem._id))
        {
          if(selectedItems[i].toppings.length === selectedToppings.length)
          {
            for(let j =0; j<selectedToppings.length;j++)
            {
              if(selectedItems[i].toppings[j]!==selectedToppings[j])
              return x;
            }
            return i;
          }
        }
      }
      return x;
    }

    function handleAdd(menuItem)
    {
      let x = isPresent(menuItem)
      let amount = parseFloat(Amount);
      if(x>=0)
      {
        amount = amount + parseFloat(selectedItems[x].Amount);
        console.log(amount);
          dispatch(updateItemAmount({x, amount}));
      }
      else
      {
      let totalPrice = parseFloat(0);
      selectedToppings?.map((toppings)=>{
        if(toppings.price>0)
        totalPrice = totalPrice + parseFloat(toppings.price);
      });
      totalPrice = totalPrice + menuItem.price;
      dispatch(addSelectedItems({id:menuItem._id, name:menuItem.name, price:totalPrice, Amount:amount, toppings:selectedToppings}));
    }
      dispatch(deleteAllSelectedToppings())
      setAmount(1);
    }

    const handleChange=(e)=>{
      setAmount(e.target.value);
    }

    
    return (
        <>
      <Button style={{position:"relative", left:"10%", top: "5%"}} variant="contained" onClick={()=>navigate("/home")}>
            Back
      </Button>
      <Button style={{position:"relative", left:"80%", top:"5%"}} variant="contained" onClick={()=>navigate("/orders")}>
        Cart {selectedItems.length}
      </Button>
      <div style={myStyle}>
        <br/><br/>
      <Container>
          <Card style={{
          background:"cover",
          backgroundColor: "#0d6efd",
          marginLeft:"12rem",
          marginRight:"12rem",
        }} gutterBottom >{card} </Card>
      </Container>  
      <Stack backgroundColor="white" marginLeft={"10rem"} marginRight={"10rem"} marginTop={"2rem"}> 
        {
          
          menu?.map((menuItem)=>  {
            return(
              <React.Fragment >
      <CardContent>
        <Typography sx={{ fontSize: 18  }} color="text.primary" variant = "h3" gutterBottom fontWeight={"bold"}>
          {menuItem.name}
          <Typography style={{float:"right", height:"20px", marginRight:"1rem"}} gutterBottom>
            Amount
            <input value = {Amount} onChange={handleChange} style={{float:"right", width : "50px", height:"20px", marginLeft: '0.5rem'}} type = "text" pattern="^[1-9\b]+$" gutterBottom></input>
          </Typography>
        </Typography>
        <Typography color="text.primary" gutterBottom>
            {menuItem.description}
        <Button onClick={()=>handleAdd(menuItem)} variant="contained" style={{backgroundColor: "#00008b", float:"right", marginRight:"1rem"}}>+ Add</Button>
        </Typography>
        <Typography sx={{ fontSize: 18  }}color = "#d2691e" variant = "h5" fontWeight={"bold"}>
          ${menuItem.price}
          <Button  onClick={()=>handleToppingsClick(menuItem, Amount)} variant="contained" style={{marginLeft: '2rem', backgroundColor: "#00008b"}}>+ Toppings</Button>
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

export default MenusList
