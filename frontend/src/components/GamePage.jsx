import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { HashConnect, HashConnectTypes } from 'hashconnect';

import GameScore from '../../../artifacts/contracts/GameScore.sol/GameScore.json';

const gameScoreAddress = '0xYourContractAddress'; // Replace with your GameScore contract address

const GamePage = () => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hashconnect, setHashConnect] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (isConnected && signer) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(gameScoreAddress, GameScore.abi, provider.getSigner());
      setContract(contractInstance);
    }

    const hc = new HashConnect();
    setHashConnect(hc);
  }, [isConnected, signer]);

  const startGame = () => {
    setIsPlaying(true);
    setGameScore(0); // Reset score
    // Additional game start logic here
  };

  const endGame = () => {
    setIsPlaying(false);
    saveGameScore();
    // Additional game end logic here if any I have left this for more improvement
  };

  const saveGameScore = async () => {
    if (!address || !gameScore) return;

    // Interact with the smart contract to save the score
    try {
      const tx = await contract.saveScore(gameScore, {
        from: address,
      });
      await tx.wait();
    } catch (error) {
      console.error("Error saving score:", error);
    }

    // Save the score to the backend
    fetch('http://localhost:3001/game/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: address,
        score: gameScore,
        timestamp: new Date().toISOString(),
      }),
    });
  };

  const connectHashpack = async () => {
    if (!hashconnect) return;

    const appMetadata = {
      name: "GameDapp",
      description: "Gaming DApp",
      icon: "iconUrl"
    };

    hashconnect.connect(appMetadata, "testnet", true);
    const topic = hashconnect.getProvider("testnet").topic;
    const walletData = await hashconnect.connectToLocalWallet();
    // Handle wallet connection logic here
  };

  return (
    <div>
      <h1>Solitaire Game</h1>
      {!isConnected ? (
        <ConnectButton />
      ) : (
        <div>
          <p>Connected as {address}</p>
          <button onClick={startGame}>Start Game</button>
          {isPlaying && (
            <div>
              {/* Game component goes here */}
              <p>Game is running...</p>
              <button onClick={endGame}>End Game</button>
            </div>
          )}
          {!isPlaying && (
            <button onClick={connectHashpack}>Connect with Hashpack</button>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;
