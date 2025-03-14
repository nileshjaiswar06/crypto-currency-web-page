import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NFTPriceTraker.css';

const NFTPriceTracker = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list');
        setNfts(response.data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className='nft-price-tracker'>
      <h2>Trending NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <img 
              src={nft.image?.small || nft.image?.small_2x} 
              alt={nft.name.slice(0, 4)} 
              className='nft-image' 
            />
            <div className='nft-details'>
              <h3>{nft.name}</h3>
              <p className='symbol'><b>Symbol:</b>  <span>{nft.symbol}</span></p>
              <p className='market-cap'>Market Cap: <span>{nft.market_cap}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTPriceTracker;