import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, LogOut } from 'lucide-react';
import { formatAddress } from '@/lib/web3';

export const WalletButton = () => {
  const { address, isConnected, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <Button
        onClick={disconnect}
        variant="outline"
        className="glass-card border-primary/30 hover:border-primary/50"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {formatAddress(address)}
        <LogOut className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={connect}
      className="bg-gradient-to-r from-primary to-primary/80 hover:glow-effect transition-all"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};
