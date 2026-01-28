'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 * Renders the RainbowKit connect button using the *app-level* Wagmi/RainbowKit providers
 * from `src/app/WagmiProviders.tsx`.
 *
 * IMPORTANT: Do not create nested WagmiProvider/RainbowKitProvider/QueryClientProvider here,
 * as that can cause render loops ("Maximum update depth exceeded") and context mismatches.
 */
export default function WalletConnect() {
  return <ConnectButton />;
}
