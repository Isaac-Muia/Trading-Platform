import React from "react";
import '../App.css';
import { useState, useEffect } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Account from "../components/Account";
import TradeHistory from "../components/TradeHistory"
import Stocks from "../components/Stocks";
import axios from "axios";

const Profile = (props) => {
    const username = props.username;
    const bearer = props.bearer;
    const [account, setAccount] = useState(false);
    const [tradeHistory, setTradeHistory] = useState(false);
    const [stocks, setStocks] = useState(true);

    const [stocksOwned, setStocksOwned] = useState([])

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
    .then(response => 
    axios.get("http://localhost:8091/tradePlatform/stockOwner/byUserId/" + JSON.stringify(response.data.id), requestOptions)
         .then(response => setStocksOwned(response.data))
         .catch(error => console.log(error)))
    .catch(error => console.log(error))
  }

    const showAccount = () => {
      setAccount(true);
      setTradeHistory(false);
      setStocks(false);
    }
    const showTradeHistory = () => {
      setAccount(false);
      setTradeHistory(true);
      setStocks(false);
    }
    const showStocks = () => {
      setAccount(false);
      setTradeHistory(false);
      setStocks(true);
    }
    return(
        <div className = "profile">

         {account ? <Account bearer={bearer} username={username} stocksOwned={stocksOwned}></Account> : tradeHistory ? <TradeHistory bearer={bearer}  username={username}></TradeHistory> :  stocks ? <Stocks bearer={bearer} username={username} stocksOwned={stocksOwned}></Stocks> : <></>}
   
    <div className="Account-navigation">
         <ToggleButtonGroup
      value="left"
      exclusive
      aria-label="text alignment"
      orientation="vertical"
    >
      <ToggleButton className = "profile-nav-btn"value="Account" label = "Account" aria-label="left aligned" onClick={showAccount}>
       <h2>Account</h2>
      </ToggleButton><br></br><br></br><br></br><br></br>
      <ToggleButton  className = "profile-nav-btn "value="Trades" label = "Trades" aria-label="centered" onClick={showTradeHistory}>
        <h2>Trade History</h2>
      </ToggleButton><br></br><br></br><br></br><br></br>
      <ToggleButton  className = "profile-nav-btn" value="Stock" label = "Stock" aria-label="centered" onClick={showStocks}>
        <h2>Stocks</h2>
      </ToggleButton><br></br><br></br><br></br><br></br>
    </ToggleButtonGroup>
    </div>
    </div>
    );
}

export default Profile;