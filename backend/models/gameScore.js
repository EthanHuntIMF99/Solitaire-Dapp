const mongoose = require('mongoose');

const GameScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  timeTaken: { type: Number, required: true },
  movesDone: { type: Number, required: true }
});

module.exports = mongoose.model('GameScore', GameScoreSchema);
