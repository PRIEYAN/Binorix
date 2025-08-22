'use client'

import './globals.css';
import { Poppins } from 'next/font/google';
import { WagmiProvider } from 'wagmi';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { config } from "@/lib/wagmiConfig";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

import {
  avalanche,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';


// Create a single QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
              <RainbowKitProvider>
                {children}
              </RainbowKitProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
