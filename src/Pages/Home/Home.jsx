import React, { useEffect, useState ,useContext } from 'react'
import './Home.css'
import {CoinContext} from '../../Context/Coin_Context'

const Home = () => {

  const {allCoins, currency} = useContext(CoinContext)
  const [displayCoins, setDisplayCoin] = useState([])
  const [input, setInput] = useState('')

  const inputHandleSearch = (e) => {
    setInput(e.target.value)
    if(e.target.value === ''){
      setDisplayCoin(allCoins)
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault()
    const filteredCoins = await allCoins.filter(coin => { return coin.name.toLowerCase().includes(input.toLowerCase())})
    setDisplayCoin(filteredCoins)
  }

  useEffect(() => {
    setDisplayCoin(allCoins)
  }, [allCoins])

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Welcome to <br />Coin Tracker</h1>
        <p>Track the latest prices of cryptocurrencies</p>
        <form onSubmit={searchHandler}>

          <input onChange={inputHandleSearch} list = 'coinlist' value = {input} type="text" placeholder='Search crypto...' required/>

          <datalist id='coinlist'>
            {allCoins.map((coin, index) => (
              <option key={index} value={coin.name} />
            ))}
          </datalist>


          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign: 'center'}}>24H change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoins.slice(0, 10).map((item, index) => (
          <div className='table-layout' key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name + ' - ' + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className = {item.price_change_percentage_24h > 0 ? 'green' : 'red'}>{Math.floor(item.price_change_percentage_24h * 100) / 100}%</p>
            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home