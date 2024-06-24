import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';



const LoginPage = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const handleDiscordLogin = () => {
    window.location.href = 'http://localhost:3001/auth/discord';
  };
  const handleWalletConnect = (account) => {
    setWalletAddress(account);
    // Save user and wallet address to your backend
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        discordId: discordUser.id,
        walletAddress: account,
      }),
    });
  };

  return (
    <div>
      <h1>Login/Register</h1>
      {!discordUser ? (
        <button onClick={handleDiscordLogin}>Login with Discord</button>
      ) : (
        <div>
          <p>Logged in as {discordUser.username}</p>
          <ConnectButton onConnect={({ account }) => handleWalletConnect(account)} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
