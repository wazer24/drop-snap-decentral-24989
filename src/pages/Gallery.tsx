import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { ImageCard } from '@/components/gallery/ImageCard';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Image {
  id: string;
  cid: string;
  filename: string;
  uploader_wallet: string;
  uploaded_at: string;
  view_count: number;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .order('uploaded_at', { ascending: false });

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('images-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'images',
        },
        (payload) => {
          setImages((current) => [payload.new as Image, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Discover Images
          </h1>
          <p className="text-muted-foreground">
            Explore decentralized image storage on IPFS
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No images yet. Be the first to upload!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                cid={image.cid}
                filename={image.filename}
                uploaderWallet={image.uploader_wallet}
                uploadedAt={image.uploaded_at}
                viewCount={image.view_count}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
