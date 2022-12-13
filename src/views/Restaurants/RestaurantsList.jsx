import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { Button} from '@mui/material'
import CardContent from '@mui/material/CardContent';
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from 'axios'

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


const RestaurantsList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [contactNumber, setContactNumber] = useState()
    const [pinCode, setPinCode] = useState()
    const currentRestaurant = useSelector((state)=>state.Restaurants.currentRestaurant)
    const selectedItems = useSelector((state)=>state.menus.selectedItems)
    const [Items, setItems] = useState([]);
    const [FinalPrice, setFinalPrice] = useState();
    
    function selectedMenus()
    {
      var temp =0;
      var tempItems=[];
      for(let i =0; i<selectedItems.length;i++)
      {
          tempItems[i] = selectedItems[i].name
          temp = parseFloat(temp) + parseFloat(selectedItems[i].price);
      }
      setFinalPrice(temp);
      setItems(tempItems);
    }

    const data = {
      restaurant_name:currentRestaurant.name,
      userName:name,
      address:address,
      pin_code:pinCode,
      contact_number:contactNumber,
      selectedItems:Items,
      Amount:selectedItems.length,
      total_price:FinalPrice
    }
   
    const handleNameChange=(e)=>{
        setName(e.target.value);
      }

    const handleAddressChange=(e)=>{
        setAddress(e.target.value);
      }

      const handleConactNumberChange=(e)=>{
        setContactNumber(e.target.value);
      }

      const handlePinCodeChange=(e)=>{
        setPinCode(e.target.value);
      }

      function placeOrder()
      {
          axios.post("http://localhost:3000/Orders", data);
          alert("Order Placed");
          navigate("/home")
          window.location.reload();
      }

      useEffect(() => {
        selectedMenus();
    }, [])


    return (
        <div style={myStyle}>
        <Button style={{position:"relative", left:"10%", top: "10%"}} variant="contained" onClick={()=>navigate("/home")}>
            Back
      </Button>
    <React.Fragment  >
      <CardContent style={{float:"center", position:"relative", left:"10%", top: "15%", marginRight:"15rem", backgroundColor:"white"}}>       
        <Typography style={{}}>
       Name : <input value = {name} onChange={handleNameChange} style={{}} type = "text" gutterBottom></input>
      </Typography>
      <br/>
      <Typography>
      Address : <input value = {address} onChange={handleAddressChange} style={{}} type = "text" gutterBottom></input>
      </Typography>
      <br/>
      <Typography>
      Pin Code : <input value = {pinCode} onChange={handlePinCodeChange} style={{}} type = "text" gutterBottom></input>
      </Typography>
      <br/>
      <Typography>
      Contact Number : <input value = {contactNumber} onChange={handleConactNumberChange} style={{}} type = "text" gutterBottom></input>
      </Typography>
      </CardContent>
      <Button style={{float:"center", position:"relative", left:"50%", top: "20%"}} variant="contained" onClick={()=>placeOrder()}>
            Place Order
      </Button>
    </React.Fragment>
    </div>
    )
}

export default RestaurantsList
