// const express = require('express');
// const { login, callback, connectWallet } = require('../controllers/authController');

// const router = express.Router();

// router.get('/login', login);
// router.get('/callback', callback);
// router.post('/connectWallet', connectWallet);

// module.exports = router;

// backend/routes/auth.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get('/discord', (req, res) => {
  const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
  res.redirect(redirectUri);
});

router.get('/discord/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;
    res.json(user); // Send user data to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

