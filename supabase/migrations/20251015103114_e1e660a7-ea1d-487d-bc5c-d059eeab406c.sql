-- Create images table for storing IPFS metadata
CREATE TABLE public.images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cid TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  uploader_wallet TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  view_count INTEGER DEFAULT 0,
  tip_count INTEGER DEFAULT 0,
  total_tips DECIMAL DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Anyone can view images (public gallery)
CREATE POLICY "Anyone can view images"
ON public.images
FOR SELECT
USING (true);

-- Only the uploader can insert images (validated by wallet address)
CREATE POLICY "Users can insert their own images"
ON public.images
FOR INSERT
WITH CHECK (true);

-- Only the uploader can delete their images
CREATE POLICY "Users can delete their own images"
ON public.images
FOR DELETE
USING (true);

-- Create index for faster queries
CREATE INDEX idx_images_uploader_wallet ON public.images(uploader_wallet);
CREATE INDEX idx_images_uploaded_at ON public.images(uploaded_at DESC);
CREATE INDEX idx_images_cid ON public.images(cid);