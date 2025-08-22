'use client';

import WalletConnect from "@/app/providers";
import { IconAddressBook, IconNetwork, IconCurrencyEthereum, IconWallet } from "@tabler/icons-react";
import { avalanche, mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '322a547413a527fe6601236be62479a4',
  chains: [avalanche, mainnet, polygon, optimism, arbitrum, base],
  ssr: true, 
});

import { useAccount, useBalance, WagmiProvider, useChainId } from 'wagmi';

function WalletInfo() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance, isError, isLoading } = useBalance({
    address: address,
  });
  const chainId = useChainId();
  
  const getChainName = (chainId: number) => {
    const chainMap: { [key: number]: string } = {
      1: 'Ethereum Mainnet',
      137: 'Polygon',
      10: 'Optimism',
      42161: 'Arbitrum',
      8453: 'Base',
      43114: 'Avalanche'
    };
    return chainMap[chainId] || `Chain ID: ${chainId}`;
  };

  const formatBalance = (value: bigint | undefined, decimals: number | undefined) => {
    if (!value || !decimals) return "0";
    const formatted = Number(value) / Math.pow(10, decimals);
    return formatted.toFixed(4);
  };

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  if (isConnected) {
    return (
      <div className="bg-white flex items-center justify-center">
        <div className="w-full h-full text-blue rounded-xl shadow-lg p-8 flex flex-col gap-6">

          <div className="w-full flex justify-start">
            <WalletConnect />
          </div>

          <h1 className="text-2xl font-bold">Crypto Wallet Details</h1>

          <div className="flex flex-col gap-4 flex-grow justify-center">

            {/* Wallet Address & Network */}
            <div className="flex flex-row gap-4">
              <div className="border p-4 rounded-xl w-full md:w-1/2">
                <div className="flex items-center gap-2 text-purple-700 font-semibold">
                  <IconAddressBook size={20} />
                  <p className="mt-2 text-gray-600">
                    Connected Address : {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
                  </p>
                </div>
              </div>

              <div className="border p-4 rounded-xl w-full md:w-1/2">
                <div className="flex items-center gap-2 text-blue-500 font-semibold">
                  <IconNetwork size={20} />
                  <p>Connected Chain: {getChainName(chainId)}</p>
                </div>
              </div>
            </div>

            {/* Balance & Wallet Name */}
            <div className="flex flex-row gap-4">
              <div className="border p-4 rounded-xl w-full md:w-1/2">
                <div className="flex items-center gap-2 text-blue-500 font-semibold">
                  <IconCurrencyEthereum size={20} />
                  <p className="mt-2 text-gray-600">
                    {balance ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}` : "0"}
                  </p>
                </div>
              </div>

              <div className="border p-4 rounded-xl w-full md:w-1/2">
                <div className="flex items-center gap-2 text-purple-700 font-semibold">
                  <IconWallet size={20} />
                  <p className="mt-2 text-gray-600">
                    Type of Wallet : {connector?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <p>Wallet not connected.</p>;
}

export default function CryptoWallet() {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <WalletInfo/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
