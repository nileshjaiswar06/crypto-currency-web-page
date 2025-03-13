import React from 'react'
import './Navbar.css'
import image from '../../assets/image.png'
import {CoinContext} from '../../Context/Coin_Context'
import {useContext} from 'react'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandleChange = (e) => {
    switch (e.target.value){
      case 'usd':
        setCurrency({name: 'usd', symbol: '$'})
        break
      case 'eur':
        setCurrency({name: 'eur', symbol: '€'})
        break
      case 'inr':
        setCurrency({name: 'inr', symbol: '₹'})
        break
      default:
        setCurrency({name: 'usd', symbol: '$'})
    }
  }

  return (
    <div className='navbar'>
      <img src={image} alt='image' className='image'/>
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandleChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign up</button>
      </div>
    </div>
  )
}

export default Navbar