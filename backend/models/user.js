const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/login', authController.login);
router.get('/callback', authController.callback);
router.post('/connectWallet', authController.connectWallet);
router.post('/register', authController.register);

module.exports = router;

const UserSchema = new mongoose.Schema({
  discordId: String,
  walletAddress: String,
  gameScores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameScore' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
