import { SUPABASE_KEY, SUPABASE_URL } from '../constants';
import { SupabaseFile } from '../types';

const BUCKET_NAME = 'src';

export const listBucketFiles = async (bucketName: string, folderPath: string = ''): Promise<SupabaseFile[]> => {
  try {
    const prefix = folderPath; 

    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucketName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY
      },
      body: JSON.stringify({
        prefix: prefix,
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      }),
    });

    if (!response.ok) {
      console.error(`Error listing bucket ${bucketName}: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.filter((file: SupabaseFile) => !file.name.endsWith('.emptyFolderPlaceholder'));
  } catch (error) {
    console.error("Supabase List Error:", error);
    return [];
  }
};

export const getFileUrl = (bucketName: string, fileName: string): string => {
  const path = fileName.startsWith('/') ? fileName.substring(1) : fileName;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${path}`;
};

export const uploadBase64Image = async (base64Data: string, fileName: string): Promise<string | null> => {
  try {
    // 1. Prepare Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // 2. Define Path
    const path = `generated/${fileName}`;

    // 3. Upload to specific endpoint
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${path}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'image/png',
        // 'x-upsert': 'true' 
      },
      body: blob,
    });

    if (!response.ok) {
      console.error("Upload failed:", response.status, response.statusText);
      const errText = await response.text();
      console.error("Upload error details:", errText);
      return null;
    }

    // 4. Return Public URL
    return getFileUrl(BUCKET_NAME, path);
  } catch (error) {
    console.error("Supabase Upload Error:", error);
    return null;
  }
};