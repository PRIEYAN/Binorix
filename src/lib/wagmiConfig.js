'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bscTestnet } from 'wagmi/chains';

// Single source of truth for wagmi/rainbowkit config.
// This app is on BNB Smart Chain Testnet (chainId 97).
export const config = getDefaultConfig({
  appName: 'Zypher Medical DApp',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '322a547413a527fe6601236be62479a4',
  chains: [bscTestnet],
  ssr: true,
});

// Back-compat for any callers expecting initConfig().
export async function initConfig() {
  return config;
}

// Back-compat alias.
export async function getWagmiConfig() {
  return config;
}
