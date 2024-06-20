// module.exports = {
//   discordClientId: process.env.DISCORD_CLIENT_ID,
//   discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
//   mongoUri: process.env.MONGO_URI,
//   port: process.env.PORT || 5000,
// };
module.exports = {
  dbURI: process.env.MONGODB_URI,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI,
};
