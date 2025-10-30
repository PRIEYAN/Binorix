// QIE Chain Mainnet Configuration for Binorix Medical DApp

export const QIE_MAINNET_CONFIG = {
  chainId: 8888,
  chainName: 'QIE Chain Mainnet',
  nativeCurrency: {
    name: 'QIE',
    symbol: 'QIE',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.qiechain.com'] },
    public: { http: ['https://rpc.qiechain.com'] },
  },
  blockExplorers: {
    default: {
      name: 'QIEScan',
      url: 'https://scan.qiechain.com',
    },
  },
  testnet: false,
};

export const CONTRACT_ADDRESSES = {
  PRESCRIPTION_RECORDS: process.env.NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000', // Update with actual QIE contract address
};

export const NETWORK_PARAMS = {
  chainId: '0x22B8', // 8888 in hex
  chainName: 'QIE Chain Mainnet',
  nativeCurrency: {
    name: 'QIE',
    symbol: 'QIE',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.qiechain.com'],
  blockExplorerUrls: ['https://scan.qiechain.com'],
};

// Helper function to add QIE Chain Mainnet to MetaMask
export const addQIEChainToMetaMask = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_PARAMS],
      });
      console.log('✅ QIE Chain Mainnet added to MetaMask');
      return true;
    } catch (error) {
      console.error('❌ Failed to add QIE Chain Mainnet to MetaMask:', error);
      return false;
    }
  }
  return false;
};

// Helper function to switch to QIE Chain Mainnet
export const switchToQIEChain = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_PARAMS.chainId }],
      });
      console.log('✅ Switched to QIE Chain Mainnet');
      return true;
    } catch (error: any) {
      // If the chain is not added, add it
      if (error.code === 4902) {
        return await addQIEChainToMetaMask();
      }
      console.error('❌ Failed to switch to QIE Chain Mainnet:', error);
      return false;
    }
  }
  return false;
};

export default QIE_MAINNET_CONFIG;
