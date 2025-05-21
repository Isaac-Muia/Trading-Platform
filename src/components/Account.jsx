import React from "react";
import '../App.css';
import { useState, useEffect } from 'react'
import axios from "axios";

const Account = (props) => {
  const username = props.username
  const bearer = props.bearer
  const stocksOwned = props.stocksOwned
  const [netWealth, setNetWealth] = useState(0)
  var nw = 0
  const [funds, setFunds] = useState()
  const [stocks, setStocks] = useState()

  useEffect(() => {
    loadStocks()
  }, [])

  const loadStocks = () => {
    const requestOptions = {
        headers:{
          "Authorization":bearer
        }
      }
    const endpoint1 = "http://localhost:8091/tradePlatform/users/me"
    axios.get(endpoint1, requestOptions)
    .then(response => setFunds(response.data.funds))
    .catch(error => console.log(error))

    const endpoint2 = "http://localhost:8091/tradePlatform/stocks"
    axios.get(endpoint2, requestOptions)
    .then(response => {setStocks(response.data)})
    .catch(error => console.log(error))
    stocksOwned.forEach(stockOwned => {
       nw = nw + Number(stockOwned.share_amount) * Number(stockOwned.stock.value)
})
    nw = Math.round(nw * 100) / 100
    setNetWealth(nw)
    nw = 0
    }
    return (
        <div className="account">
           <h1>Account</h1>
           <p className="account-text">
            {username}'s profile
           </p><br></br>
           <div>
            <p className="account-text">
                Funds: ${Math.round(funds * 100) / 100}
            </p><br></br>
            <p className="account-text">
                Net Wealth: ${Math.round((netWealth + funds) * 100) / 100}
            </p>
           </div>
      </div>
      );
  }
  
  export default Account;