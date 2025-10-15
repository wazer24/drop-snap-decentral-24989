import { Link } from 'react-router-dom';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Upload, Home, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-effect">
            <Image className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">SnapDrop</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/gallery">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Image className="mr-2 h-4 w-4" />
              Gallery
            </Button>
          </Link>
          <Link to="/upload">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </Link>
          <WalletButton />
        </div>
      </div>
    </nav>
  );
};
