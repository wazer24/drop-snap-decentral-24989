import { BrowserProvider, JsonRpcSigner } from 'ethers';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<WalletState> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask to use this app.');
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const network = await provider.getNetwork();
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return {
      address,
      isConnected: true,
      chainId: Number(network.chainId),
    };
  } catch (error: any) {
    console.error('Error connecting wallet:', error);
    throw new Error(error.message || 'Failed to connect wallet');
  }
};

export const disconnectWallet = (): WalletState => {
  return {
    address: null,
    isConnected: false,
    chainId: null,
  };
};

export const getWalletState = async (): Promise<WalletState> => {
  if (!window.ethereum) {
    return {
      address: null,
      isConnected: false,
      chainId: null,
    };
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_accounts', []);
    
    if (accounts.length === 0) {
      return {
        address: null,
        isConnected: false,
        chainId: null,
      };
    }

    const network = await provider.getNetwork();
    
    return {
      address: accounts[0],
      isConnected: true,
      chainId: Number(network.chainId),
    };
  } catch (error) {
    console.error('Error getting wallet state:', error);
    return {
      address: null,
      isConnected: false,
      chainId: null,
    };
  }
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
