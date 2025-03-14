import React, { useEffect, useState } from 'react';
import './NFTPriceTraker.css';

const NFTPriceTracker = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/nfts/list', {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        });
        const data = await response.json();
        setNfts(data);
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
              <p className='symbol'>Symbol: <span>{nft.symbol}</span></p>
              <p className='market-cap'>Market Cap: <span>{nft.market_cap}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTPriceTracker;