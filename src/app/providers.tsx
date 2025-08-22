import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  avalanche,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '322a547413a527fe6601236be62479a4',
  chains: [avalanche, mainnet, polygon, optimism, arbitrum, base],
  ssr: true, 
});

const queryClient = new QueryClient();
export default function WalletConnect(){
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode >
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
