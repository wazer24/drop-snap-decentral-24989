// Web3.Storage API for IPFS uploads
const WEB3_STORAGE_TOKEN = 'YOUR_WEB3_STORAGE_TOKEN'; // Users will need to add their own token

export interface IPFSUploadResult {
  cid: string;
  size: number;
}

export const uploadToIPFS = async (file: File): Promise<IPFSUploadResult> => {
  try {
    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('file', file);

    // Upload to Web3.Storage API
    const response = await fetch('https://api.web3.storage/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WEB3_STORAGE_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      cid: data.cid,
      size: file.size,
    };
  } catch (error: any) {
    console.error('IPFS upload error:', error);
    throw new Error(error.message || 'Failed to upload to IPFS');
  }
};

export const getIPFSUrl = (cid: string): string => {
  return `https://${cid}.ipfs.w3s.link`;
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Supported: PNG, JPG, GIF, WebP' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }

  return { valid: true };
};
