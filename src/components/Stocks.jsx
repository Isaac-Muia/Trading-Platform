import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import '../App.css';

const Stocks = (props) => {
  const username = props.username
  const stocksOwned = props.stocksOwned

    return (
        <div className="account">
           <h1>Stocks</h1><br></br>
           <p className="account-text">
            {username}'s stocks
           </p>
           <div>
           <div className="table-container">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 1500}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Stock</TableCell>
            <TableCell align="left">Shares</TableCell>
            <TableCell align="left">Price per share</TableCell>
            <TableCell align="left">Total value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocksOwned.map((row) => (
    
            <TableRow
              key={row.trade_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.stock.name}</TableCell>
              <TableCell align="left">{row.share_amount}</TableCell>
              <TableCell align="left">${row.stock.value}</TableCell>
              <TableCell align="left">${Math.round(row.stock.value * row.share_amount * 100) / 100}</TableCell>
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
  
  export default Stocks;