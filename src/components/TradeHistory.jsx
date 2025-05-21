import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import '../App.css';
import { useState, useEffect } from 'react'
import axios from "axios";


const TradeHistory = (props) => {
  const username = props.username
  const bearer = props.bearer
  const [trades, setTrades] = useState([])

  useEffect(() => {
    loadTrades()
  }, [])

  const loadTrades = () => {
    const requestOptions = {
        headers:{
          "Authorization":bearer
        }
      }
    const endpoint1 = "http://localhost:8091/tradePlatform/users/me"
    axios.get(endpoint1, requestOptions)
    .then(response => 
    axios.get("http://localhost:8091/tradePlatform/trades/byUserId/" + JSON.stringify(response.data.id), requestOptions)
         .then(response => setTrades(response.data))
         .catch(error => console.log(error)))
    .catch(error => console.log(error))
    
  }

    return (
        <div className="account">
           <h1>Trade History</h1><br></br>
           <p className="account-text">
            {username}'s trades
           </p>
           <div>
    <div className="table-container">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 1500}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Stock</TableCell>
            <TableCell align="left">Shares Bought/Sold</TableCell>
            <TableCell align="left">Price per share</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((row) => (
            
            <TableRow
              key={row.trade_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.stock.name}</TableCell>
              <TableCell align="left">{row.share_amount}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>

      </div>
      );
  }
  
  export default TradeHistory;