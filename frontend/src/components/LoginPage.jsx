import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';



const LoginPage = () => {
  const [discordUser, setDiscordUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      oauth.tokenRequest({
        code,
        scope: 'identify',
        grantType: 'authorization_code',
      }).then((token) => {
        oauth.getUser(token.access_token).then((user) => {
          setDiscordUser(user);
          // Save user and wallet address to your backend
        });
      });
    }
  }, []);

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
