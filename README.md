# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Directory Structure

Gaming-Dapp/
├── backend/
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── auth.js
│   │   └── game.js
│   ├── controllers/
│   │   └── authController.js
│   │   └── gameController.js
│   ├── server.js
│   ├── config.js
├── contracts/
│   └── GameScore.sol
│   └── deploy.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── LoginPage.jsx
│   │   │   └── GamePage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
├── .env
├── package.json
├── hardhat.config.js

Here are the CLI commands to install all necessary packages and set up your Gaming-Dapp project for the Solitaire game:

### Backend
1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Initialize npm and install dependencies:**
   ```sh
   npm init -y
   npm install express mongoose dotenv cors
   npm install passport passport-discord express-session body-parser
   npm install ethers hedera-sdk hashconnect
   ```

### Contracts
1. **Navigate to the contracts directory:**
   ```sh
   cd ../contracts
   ```

2. **Initialize npm and install Hardhat and other dependencies:**
   ```sh
   npm init -y
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
   ```

3. **Compile the smart contracts:**
   ```sh
   npx hardhat compile
   ```

### Frontend
1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
   ```

2. **Initialize npm and install dependencies:**
   ```sh
   npm init -y
   npm install react react-dom
   npm install @rainbow-me/rainbowkit @tanstack/react-query ethers hashconnect wagmi react-router-dom
   npm install vite @vitejs/plugin-react --save-dev
   ```

### Running the Application
1. **Start the Backend Server:**
   ```sh
   cd backend
   node server.js
   ```

2. **Deploy Smart Contracts:**
   ```sh
   cd ../contracts
   npx hardhat run deploy.js --network testnet
   ```

3. **Start the Frontend Development Server:**
   ```sh
   cd ../frontend
   npm run dev
   ```


This setup includes integrating MetaMask and Hashpack for wallet connections, implementing login, registration, and game functionalities as specified.