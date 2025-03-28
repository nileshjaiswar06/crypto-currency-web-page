import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Coin from './Pages/Coin/Coin';
import Footer from './Components/Footer/Footer';
import NFTPriceTracker from './Components/NFT/NFTPriceTraker';
import Converter from './Components/Converter/Converter';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='/nft-price-tracker' element={<NFTPriceTracker />} />
        <Route path='/converter' element={<Converter />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;