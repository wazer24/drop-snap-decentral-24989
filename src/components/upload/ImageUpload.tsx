import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, FileImage, Check } from 'lucide-react';
import { uploadToIPFS, validateImageFile } from '@/lib/ipfs';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

export const ImageUpload = () => {
  const { address, isConnected } = useWallet();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedCID, setUploadedCID] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!isConnected || !address) {
        toast({
          title: 'Wallet Not Connected',
          description: 'Please connect your wallet to upload images',
          variant: 'destructive',
        });
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast({
          title: 'Invalid File',
          description: validation.error,
          variant: 'destructive',
        });
        return;
      }

      setUploading(true);
      setProgress(0);

      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 200);

        // Upload to IPFS
        const { cid, size } = await uploadToIPFS(file);
        
        clearInterval(progressInterval);
        setProgress(95);

        // Save metadata to database
        const { error } = await supabase.from('images').insert({
          cid,
          filename: file.name,
          file_size: size,
          mime_type: file.type,
          uploader_wallet: address,
          metadata: {
            originalName: file.name,
            uploadedWith: 'SnapDrop',
          },
        });

        if (error) throw error;

        setProgress(100);
        setUploadedCID(cid);

        toast({
          title: 'Upload Successful!',
          description: `Image uploaded to IPFS: ${cid}`,
        });
      } catch (error: any) {
        console.error('Upload error:', error);
        toast({
          title: 'Upload Failed',
          description: error.message || 'Failed to upload image',
          variant: 'destructive',
        });
      } finally {
        setUploading(false);
      }
    },
    [address, isConnected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <Card className="glass-card p-8 border-primary/30">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive ? 'border-accent bg-accent/10 glow-accent' : 'border-primary/30 hover:border-primary/50'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {uploadedCID ? (
            <>
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center glow-accent">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Upload Complete!</h3>
              <p className="text-muted-foreground text-sm max-w-md break-all">
                CID: {uploadedCID}
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedCID(null);
                  setProgress(0);
                }}
                variant="outline"
                className="mt-4"
              >
                Upload Another
              </Button>
            </>
          ) : uploading ? (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse glow-effect">
                <Upload className="w-10 h-10 text-primary animate-float" />
              </div>
              <h3 className="text-xl font-semibold">Uploading to IPFS...</h3>
              <Progress value={progress} className="w-full max-w-md" />
              <p className="text-muted-foreground text-sm">{progress}% complete</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <FileImage className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Drop your image here</h3>
              <p className="text-muted-foreground">
                or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, GIF, WebP (max 50MB)
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
