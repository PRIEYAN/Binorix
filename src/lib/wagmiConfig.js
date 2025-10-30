import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QIE_MAINNET_CONFIG } from './qieConfig'

export const config = createConfig({
  chains: [QIE_MAINNET_CONFIG, mainnet],
  transports: {
    [QIE_MAINNET_CONFIG.chainId]: http('https://rpc.qiechain.com'),
    [mainnet.id]: http(),
  },
})
