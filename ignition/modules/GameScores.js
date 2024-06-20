const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GameScoresModule", (m) => {
  // Deploy the GameScores contract
  const gameScores = m.contract("GameScores");

  return { gameScores };
});


//npx hardhat ignition deploy ignition/modules/GameScores.js --network localhost
