import { Navigation } from '@/components/layout/Navigation';
import { ImageUpload } from '@/components/upload/ImageUpload';
import { useWallet } from '@/contexts/WalletContext';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Upload = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Upload to IPFS
            </h1>
            <p className="text-muted-foreground">
              Share your images on the decentralized web
            </p>
          </div>

          {!isConnected && (
            <Alert className="mb-6 glass-card border-accent/30">
              <Info className="h-4 w-4 text-accent" />
              <AlertDescription className="text-foreground">
                Please connect your MetaMask wallet to upload images.
              </AlertDescription>
            </Alert>
          )}

          <ImageUpload />

          <Card className="glass-card p-6 mt-6 border-primary/20">
            <h3 className="font-semibold mb-4">About IPFS Storage</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Images are stored permanently on IPFS (InterPlanetary File System)</li>
              <li>• Each upload receives a unique CID (Content Identifier)</li>
              <li>• Your wallet address is linked to your uploads for ownership verification</li>
              <li>• Supported formats: PNG, JPG, GIF, WebP (max 50MB)</li>
              <li>• All uploads are public and accessible via IPFS gateways</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
