import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import GameScore from '../../../artifacts/contracts/GameScore.sol/GameScores.json';

const gameScoreAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const GamePage = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [score, setScore] = useState(null);
  const [startTime, setStartTime] = useState(null);
  useEffect(() => {
    if (walletClient) {
      const provider = new ethers.providers.Web3Provider(walletClient.provider);
      const gameScoreContract = new ethers.Contract(gameScoreAddress, GameScore.abi, provider.getSigner());

      

      // Fetch game scores or interact with the contract as needed
      // Example: Fetch the latest score
      const fetchScore = async () => {

        const scores = await gameScoreContract.getScores(address);
        const latestScore = scores[scores.length - 1];
        setScore({
          timeTaken: latestScore.timeTaken.toString(),
          movesDone: latestScore.movesDone.toString(),
        });
      };

      fetchScore();
    }
  }, [walletClient, address]);

  const handleGameStart = () => {
    setStartTime(Date.now());
  };

  const handleGameEnd = async (movesDone) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // time taken in seconds

    if (walletClient) {
      const provider = new ethers.providers.Web3Provider(walletClient.provider);
      const gameScoreContract = new ethers.Contract(gameScoreAddress, GameScore.abi, provider.getSigner());

      // Save game score to the smart contract
      await gameScoreContract.addScore(startTime, endTime, timeTaken, movesDone);

      // Update the score after saving
      const scores = await gameScoreContract.getScores(address);
      const latestScore = scores[scores.length - 1];
      setScore({
        timeTaken: latestScore.timeTaken.toString(),
        movesDone: latestScore.movesDone.toString(),
      });
    }
  };

  return (
    <div>
      <h1>Game Page</h1>
      <p>Your latest score: Time Taken - {score?.timeTaken} seconds, Moves Done - {score?.movesDone}</p>
      <button onClick={handleGameStart}>Start Game</button>
      <button onClick={() => handleGameEnd(42)}>End Game</button> {/* Example with 42 moves */}

    </div>
  );
};

export default GamePage;
