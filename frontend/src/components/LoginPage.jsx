import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';



const LoginPage = () => {
  const [discordUser, setDiscordUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  //   if (code) {
  //     oauth.tokenRequest({
  //       code,
  //       scope: 'identify',
  //       grantType: 'authorization_code',
  //     }).then((token) => {
  //       oauth.getUser(token.access_token).then((user) => {
  //         setDiscordUser(user);
  //         // Save user and wallet address to your backend
  //       });
  //     });
  //   }
  // }, []);
        if (code) {
          fetch(`http://localhost:3001/auth/discord/callback?code=${code}`)
            .then(response => response.json())
            .then(user => {
              setDiscordUser(user);
              // Save user to backend
              saveUserToBackend(user, walletAddress);
            });
        }
      }, [walletAddress]);

  const handleDiscordLogin = () => {
    window.location.href = 'http://localhost:3001/auth/discord';
  };

  // const handleWalletConnect = (account) => {
  //   setWalletAddress(account);
  //   // Save user and wallet address to your backend
  //   fetch('http://localhost:3001/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       discordId: discordUser.id,
  //       walletAddress: account,
  //     }),
  //   });
  // };
  const handleWalletConnect = (account) => {
    setWalletAddress(account.walletAddress);
    // Save user and wallet address to backend if discordUser is already set
    if (discordUser) {
      saveUserToBackend(discordUser, account.walletAddress);
    }
  };

  const saveUserToBackend = (discordUser, walletAddress) => {
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        discordId: discordUser.id,
        username: discordUser.username,
        walletAddress: walletAddress,
      }),
    })
      .then(response => response.json())
      .then(data => console.log('User saved:', data))
      .catch(error => console.error('Error saving user:', error));
  };

  return (
    <div>
      <h1>Login/Register</h1>
      {!discordUser ? (
        <button onClick={handleDiscordLogin}>Login with Discord</button>
      ) : (
        <div>
          <p>Logged in as {discordUser.username}</p>
          <ConnectButton onConnect={({ account }) => handleWalletConnect(account.walletAddress)} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
