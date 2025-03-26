import React, { useState, useContext } from 'react';
import './Converter.css';
import { CoinContext } from '../../Context/Coin_Context'; // Import the CoinContext

const Converter = () => {
  const { allCoins, currency } = useContext(CoinContext); // Access all coins and selected currency from context
  const [crypto1, setCrypto1] = useState('');
  const [crypto2, setCrypto2] = useState('');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);
  const [warning, setWarning] = useState(''); // State to store warning messages

  const handleConvert = async () => {
    // Validation: Ensure both "From" and "To" fields are filled
    if (!crypto1 || !crypto2) {
      setWarning('⚠️ Please select both "From" and "To" cryptocurrencies.');
      return;
    }

    setWarning(''); // Clear any previous warnings

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto1},${crypto2}&vs_currencies=${currency.name}`
      );
      const data = await response.json();

      const crypto1Price = data[crypto1][currency.name];
      const crypto2Price = data[crypto2][currency.name];

      const result = (amount * crypto1Price) / crypto2Price;
      setConversionResult(result);
    } catch (error) {
      console.error('Error fetching conversion data:', error);
    }
  };

  // Helper function to get the coin image URL
  const getCoinImage = (coinId) => {
    const coin = allCoins.find((c) => c.id === coinId);
    return coin ? coin.image : '';
  };

  return (
    <div className="converter">
      <h2>Crypto Converter ( In $ )</h2>
      <div>
        <label>
          From:
          <input
            type="text"
            value={crypto1}
            onChange={(e) => setCrypto1(e.target.value.toLowerCase())}
            list="coinlist"
            placeholder="e.g., bitcoin"
          />
          <datalist id="coinlist">
            {allCoins.map((coin, index) => (
              <option key={index} value={coin.id} />
            ))}
          </datalist>
        </label>
      </div>
      <div>
        <label>
          To:
          <input
            type="text"
            value={crypto2}
            onChange={(e) => setCrypto2(e.target.value.toLowerCase())}
            list="coinlist"
            placeholder="e.g., ethereum"
          />
          <datalist id="coinlist">
            {allCoins.map((coin, index) => (
              <option key={index} value={coin.id} />
            ))}
          </datalist>
        </label>
      </div>
      {/* Amount Input with "From" Crypto Image */}
<div className="amount-input-container">
  <label>
    Amount:
    <div className="input-with-image">
      {crypto1 && (
        <img
          className="currency-image-left"
          src={getCoinImage(crypto1)}
        />
      )}
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 20) {
            setAmount(value);
          }
        }}
        maxLength="20"
      />
    </div>
  </label>
</div>
      <button onClick={handleConvert}>Convert</button>
      {warning && <p className="warning">{warning}</p>} {/* Display warning message */}
      {conversionResult !== null && (
        <div>
          
          {/* Converted Amount Input with "To" Crypto Image */}
<div className="converted-amount">
  <label>
    Converted Amount:
    <div className="input-with-image">
      {crypto2 && (
        <img
          className="currency-image-right"
          src={getCoinImage(crypto2)}
        />
      )}
      <input
        type="text"
        value={conversionResult !== null ? `${conversionResult.toFixed(6)}` : ''}
        readOnly
      />
    </div>
  </label>
</div>
        </div>
      )}
    </div>
  );
};

export default Converter;