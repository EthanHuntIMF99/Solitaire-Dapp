import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  hederaTestnet,
  hedera,
  hederaPreviewnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

//import { getDefaultConfig } from '@rainbow-me/rainbowkit';
const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'GameDapp',
  projectId: 'ba9780a2b79dce6f59aebbedf4153fa7',
  chains: [mainnet, polygon, optimism, arbitrum, base, hederaTestnet, hedera, hederaPreviewnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
