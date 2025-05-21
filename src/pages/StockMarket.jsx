import React from "react";
import { Line } from "react-chartjs-2";
import '../App.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import Chart from 'chart.js/auto';

const StockMarket = (props) => {
  const bearer = props.bearer

  const [stocks, setStocks] = useState([])
  const [stocksData, setStocksData] = useState([])

  useEffect(() => {
  loadData();
}, []);

const loadData = () => {
  const requestOptions = {
    headers: {
      "Authorization": bearer
    }
  };

  axios.get("http://localhost:8091/tradePlatform/stocks")
    .then(response => {
      const stocks = response.data;
      const promises = stocks.map(stock => {
        return axios.get(`http://localhost:8091/tradePlatform/historicPrices/byStockId/${stock.stock_id}`);
      });

      Promise.all(promises)
        .then(responses => {
          const stocksArray = stocks.map((stock, index) => {
            return {
              stock,
              historicPrices: responses[index].data
            };
          });
          setStocksData(stocksArray);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

  

    return (
      <div>
      <h1>Stocks</h1><br></br>
      {stocksData.map((stockD, index) => (
        <div className="stock-graph" key={index}>
          <h1>{stockD.stock.name + "  $" + stockD.stock.value}</h1>
 
          {stockD.historicPrices && (
            <Line
              data={{ 
                labels: stockD.historicPrices.map(historicPrice => historicPrice.time_start),
                datasets: [
                  {
                    label: stockD.stock.name,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockD.historicPrices.map(historicPrice => historicPrice.price),
                  },
                ],
              }}
            />
          )}
        </div>
      ))}
    </div>
      );
  }
  
  export default StockMarket;