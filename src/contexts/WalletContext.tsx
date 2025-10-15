import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletState, connectWallet, disconnectWallet, getWalletState } from '@/lib/web3';
import { toast } from '@/hooks/use-toast';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });

  useEffect(() => {
    // Check if wallet was previously connected
    const checkWallet = async () => {
      const state = await getWalletState();
      setWalletState(state);
    };
    checkWallet();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletState(disconnectWallet());
        } else {
          checkWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        checkWallet();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connect = async () => {
    try {
      const state = await connectWallet();
      setWalletState(state);
      toast({
        title: 'Wallet Connected',
        description: 'Successfully connected to MetaMask',
      });
    } catch (error: any) {
      toast({
        title: 'Connection Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const disconnect = () => {
    setWalletState(disconnectWallet());
    toast({
      title: 'Wallet Disconnected',
      description: 'Successfully disconnected from MetaMask',
    });
  };

  return (
    <WalletContext.Provider value={{ ...walletState, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
