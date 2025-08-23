// BSC Testnet Configuration for Binorix Medical DApp

export const BSC_TESTNET_CONFIG = {
  chainId: 97,
  chainName: 'BSC Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://bsc-testnet.publicnode.com'] },
    public: { http: ['https://bsc-testnet.publicnode.com'] },
  },
  blockExplorers: {
    default: { 
      name: 'BSCScan Testnet', 
      url: 'https://testnet.bscscan.com' 
    },
  },
  testnet: true,
};

export const CONTRACT_ADDRESSES = {
  PRESCRIPTION_RECORDS: process.env.NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS || '0xEBAC788EE8fAEC69f2a15609CC4A81de65dc1dd3',
};

export const NETWORK_PARAMS = {
  chainId: '0x61', // 97 in hex
  chainName: 'BSC Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-testnet.publicnode.com'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};

// Helper function to add BSC Testnet to MetaMask
export const addBSCTestnetToMetaMask = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_PARAMS],
      });
      console.log('✅ BSC Testnet added to MetaMask');
      return true;
    } catch (error) {
      console.error('❌ Failed to add BSC Testnet to MetaMask:', error);
      return false;
    }
  }
  return false;
};

// Helper function to switch to BSC Testnet
export const switchToBSCTestnet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_PARAMS.chainId }],
      });
      console.log('✅ Switched to BSC Testnet');
      return true;
    } catch (error: any) {
      // If the chain is not added, add it
      if (error.code === 4902) {
        return await addBSCTestnetToMetaMask();
      }
      console.error('❌ Failed to switch to BSC Testnet:', error);
      return false;
    }
  }
  return false;
};

export default BSC_TESTNET_CONFIG;
