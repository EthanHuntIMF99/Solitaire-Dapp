const express = require('express');
const { saveScore, getScores } = require('../controllers/gameController');

const router = express.Router();

router.post('/saveScore', saveScore);
router.get('/getScores', getScores);

module.exports = router;
