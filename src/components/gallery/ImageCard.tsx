import { Card } from '@/components/ui/card';
import { getIPFSUrl } from '@/lib/ipfs';
import { formatAddress } from '@/lib/web3';
import { Eye, Calendar } from 'lucide-react';

interface ImageCardProps {
  cid: string;
  filename: string;
  uploaderWallet: string;
  uploadedAt: string;
  viewCount: number;
}

export const ImageCard = ({ cid, filename, uploaderWallet, uploadedAt, viewCount }: ImageCardProps) => {
  const imageUrl = getIPFSUrl(cid);
  const date = new Date(uploadedAt).toLocaleDateString();

  return (
    <Card className="glass-card overflow-hidden group hover:glow-effect transition-all duration-300 hover:scale-105">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageUrl}
          alt={filename}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-semibold text-foreground truncate">{filename}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{viewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Uploaded by{' '}
            <span className="text-accent font-mono">{formatAddress(uploaderWallet)}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
