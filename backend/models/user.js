const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: String,
  walletAddress: String,
  gameScores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameScore' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
