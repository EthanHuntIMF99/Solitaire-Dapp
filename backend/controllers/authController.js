const axios = require('axios');
const User = require('../models/user');
const config = require('../config');

exports.login = (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${config.discordClientId}&redirect_uri=${config.discordRedirectUri}&response_type=code&scope=identify`;
  res.redirect(url);
};

exports.callback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(`https://discord.com/api/oauth2/token`, null, {
      params: {
        client_id: config.discordClientId,
        client_secret: config.discordClientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.discordRedirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    const userInfo = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, username } = userInfo.data;

    let user = await User.findOne({ discordId: id });
    if (!user) {
      user = new User({ discordId: id, username });
      await user.save();
    }

    res.redirect(`/connectWallet?userId=${user._id}`);
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
};

exports.connectWallet = async (req, res) => {
  const { userId, walletAddress } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.walletAddress = walletAddress;
    await user.save();

    res.send('Wallet connected');
  } catch (error) {
    res.status(500).send('Failed to connect wallet');
  }
};
