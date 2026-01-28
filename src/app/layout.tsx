'use client'

import './globals.css';
import '../styles/animations.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from "@/utils/theme/DefaultColors";
import dynamic from 'next/dynamic';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Dynamically import Wagmi/RainbowKit providers to avoid SSR issues
// Note: WagmiProvider (via getDefaultConfig) already includes QueryClientProvider internally
const WagmiProviders = dynamic(
  () => import('./WagmiProviders').then((mod) => mod.default),
  { ssr: false }
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <WagmiProviders>
            {children}
          </WagmiProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
