import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NFTPriceTraker.css';

const NFTPriceTracker = () => {
  const [nfts, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of NFTs per page

  // Fetch NFTs from the API
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNFTs = nfts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const buttons = [];

    // Add the first page
    if (currentPage > 2) {
      buttons.push(
        <button
          key={1}
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
    }

    // Add "..." before the current page if needed
    if (currentPage > 3) {
      buttons.push(<span key="start-ellipsis">...</span>);
    }

    // Add the previous page
    if (currentPage > 1) {
      buttons.push(
        <button
          key={currentPage - 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      );
    }

    // Add the current page
    buttons.push(
      <button key={currentPage} className="active">
        {currentPage}
      </button>
    );

    // Add the next page
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key={currentPage + 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      );
    }

    // Add "..." after the current page if needed
    if (currentPage < totalPages - 2) {
      buttons.push(<span key="end-ellipsis">...</span>);
    }

    // Add the last page
    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? 'active' : ''}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="nft-price-tracker">
      {/* Header Section */}
      <div className="header">
        <h2 style={{marginTop: '20px'}}>Trending NFTs</h2>
        <div style={{marginTop: '20px', marginRight: '5px'}} className="pagination">
          {renderPagination()}
          {/* Select Page Dropdown */}
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* NFT List Section */}
      <ul className="nft-list">
        {currentNFTs.map((nft) => (
          <li key={nft.id} className="nft-item">
            <img
              src={nft.image?.small || nft.image?.small_2x}
              alt={nft.name}
              className="nft-image"
            />
            <div className="nft-details">
              <h3>{nft.name}</h3>
              <p className="symbol">
                <b>Symbol:</b> <span>{nft.symbol}</span>
              </p>
              <p className="market-cap">
                <b>Market Cap:</b> <span>{nft.market_cap || 'N/A'}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTPriceTracker;