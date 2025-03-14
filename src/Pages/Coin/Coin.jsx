import React, { useEffect } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import { CoinContext } from '../../Context/Coin_Context'

const Coin = () => {

  const {coinId} = useParams()
  const [coinData, setCoinData] = useState()
  const {currency} = useContext(CoinContext)

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-yFCNVUVnaFkRumMj6j48jFFB'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData()
  }, [currency])

  if(coinData){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData?.image?.large} alt={coinData?.name} />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
      </div>
    )
  } else{
    return (
      <div className='spinner'>
        <div className='spin'>

        </div>
      </div>
    )
  }
}

export default Coin