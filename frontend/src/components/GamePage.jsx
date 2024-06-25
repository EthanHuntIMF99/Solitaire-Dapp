// src/components/GamePage.jsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import GameScore from '../../../artifacts/contracts/GameScore.sol/GameScore.json';

const gameScoreAddress = 'THE_GAMESCORE_CONTRACT_ADDRESS';

const GamePage = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (walletClient) {
      const provider = new ethers.providers.Web3Provider(walletClient.provider);
      const gameScoreContract = new ethers.Contract(gameScoreAddress, GameScore.abi, provider.getSigner());

      // Fetch game scores or interact with the contract as needed
      // Example: Fetch the latest score
      const fetchScore = async () => {
        const latestScore = await gameScoreContract.getLatestScore();
        setScore(latestScore.toString());
      };

      fetchScore();
    }
  }, [walletClient]);

  return (
    <div>
      <h1>Game Page</h1>
      <p>Welcome, {address}</p>
      <p>Your latest score: {score}</p>
      {/* Add the game UI and logic here */}
    </div>
  );
};

export default GamePage;
