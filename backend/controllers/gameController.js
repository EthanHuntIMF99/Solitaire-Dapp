const GameScore = require('../models/gameScore');

exports.saveScore = async (req, res) => {
  const { userId, score, startTime, endTime } = req.body;

  try {
    const gameScore = new GameScore({ userId, score, startTime, endTime });
    await gameScore.save();

    res.send('Score saved');
  } catch (error) {
    res.status(500).send('Failed to save score');
  }
};

exports.getScores = async (req, res) => {
  try {
    const scores = await GameScore.find().populate('userId');
    res.json(scores);
  } catch (error) {
    res.status(500).send('Failed to fetch scores');
  }
};
