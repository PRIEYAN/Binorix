import { createConfig, http } from 'wagmi'
import { mainnet, bscTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [bscTestnet, mainnet],
  transports: {
    [bscTestnet.id]: http('https://bsc-testnet.publicnode.com'),
    [mainnet.id]: http(),
  },
})
