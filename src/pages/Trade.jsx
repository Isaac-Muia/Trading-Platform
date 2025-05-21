import '../App.css';
import {React, useState, useEffect } from 'react'
import { InputLabel, Button,TextField, FormControl, Select, MenuItem } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Trade(props) {
    const bearer = props.bearer
    const [trade, setTrade] = useState('Buy');
    const [user, setUser] = useState(Object)
    const [stocks, setStock] = useState([])
    const [selectedStock, setSelectedStock] = useState(Object)
    const [stockValue, setStockValue] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [ammount, setAmmount] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
      loadData()
    }, [])
  
    const loadData = () => {
      const requestOptions = {
          headers:{
            "Authorization":bearer
          }
        }
        console.log(selectedStock)
      const endpoint1 = "http://localhost:8091/tradePlatform/users/me"
      axios.get(endpoint1, requestOptions)
      .then(response => setUser(response.data))
      .catch(error => console.log(error))

      const endpoint2 = "http://localhost:8091/tradePlatform/stocks"
      axios.get(endpoint2, requestOptions)
      .then(response => setStock(response.data))
      .catch(error => console.log(error))
      }

      const makeTrade = (event) => {
        const requestOptions = {
          headers:{
            "Authorization":bearer
          }
        }
        if(bearer == ""){
          alert("Log in to start trading")
        }
        else if(ammount == 0 || selectedStock == Object){
          alert("Select a Stock and an amount")
        }
        else if(trade == "Buy"){
        const  endPoint = "http://localhost:8091/tradePlatform/stockOwner/buyShare/" + user.id + "/" + selectedStock.stock_id + "/" + ammount
        event.preventDefault();
        
        
        axios.post(endPoint,{},requestOptions).then(response =>{

          navigate("/account")
        }).catch(error=>alert("Not enough funds"))
      }
      else if(trade == "Sell"){
        const endPoint = "http://localhost:8091/tradePlatform/stockOwner/sellShare/" + user.id + "/" + selectedStock.stock_id + "/" + ammount
        event.preventDefault();     
        
        
        axios.post(endPoint,{},requestOptions).then(response =>{

          navigate("/account")
        }).catch(error=>alert("Not enough stock"))
      
      }
    }

    const handleTrade = (event, tradeOption) => {
      setTrade(tradeOption);
    };

    const handleStockChange = (event) => {
      setSelectedStock(event.target.value)
      setStockValue(event.target.value.value)
      setTotalCost(event.target.value.value * ammount)
  };


    const handleInputChange = (e) => {
        const input = e.target.value;
        const onlyDigits = input.replace(/[^0-9]/g, '');
        e.target.value = onlyDigits;
        setAmmount(e.target.value)
        setTotalCost(Math.round(e.target.value * stockValue * 100) / 100)
      };

    return(
        <div className = "trade">
        <h2>Make a trade</h2><br></br>
        <ToggleButtonGroup
      value={trade}
      exclusive
      onChange={handleTrade}
      aria-label="text alignment"
    >
      <ToggleButton value="Buy" label = "Buy" aria-label="left aligned">
       <h2 className = "buy">BUY</h2>
      </ToggleButton>
      <ToggleButton value="Sell" label = "Sell" aria-label="centered">
        <div>
            <h2 className = "sell">SELL</h2>
        </div>
      </ToggleButton>
    </ToggleButtonGroup><br></br><br></br>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Stock</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedStock}
    label="Stocks"
    onChange ={handleStockChange}
  >
      {stocks.map((stock) => (
                        <MenuItem key={stock.stock_id} value={stock} >{stock.name}</MenuItem>
                    ))}
  </Select>
</FormControl><br></br><br></br>
<TextField
           disabled id="outlined-read-only-input" label= {"Price Per share"}   value= {"$" + stockValue} InputProps={{readOnly: true, }}
        /><br></br><br></br>
    <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" onChange={handleInputChange} /><br></br><br></br>
    <TextField
           disabled id="outlined-read-only-input" label= {"Total Price "}   value={"$" +totalCost} InputProps={{readOnly: true, }}
        /><br></br><br></br>
   <Button variant="contained" color="success" onClick={makeTrade}>
       <h2>Make Trade</h2>
      </Button>
    </div>
    );


}

export default Trade;