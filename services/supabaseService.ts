import { SUPABASE_KEY, SUPABASE_URL } from '../constants';
import { SupabaseFile } from '../types';

const BUCKET_NAME = 'src';

export const listBucketFiles = async (bucketName: string, folderPath: string = ''): Promise<SupabaseFile[]> => {
  try {
    // Supabase storage list expects prefix to NOT start with / usually, 
    // and for 'src' bucket which acts as root for folders like 'infografico', 
    // folderPath should be 'infografico' or 'infografico/'
    
    // Normalize prefix: remove leading slash, ensure trailing slash if not empty
    let prefix = folderPath.startsWith('/') ? folderPath.substring(1) : folderPath;
    if (prefix && !prefix.endsWith('/')) {
        // If we are looking for a folder content, it usually needs a trailing slash in some APIs,
        // but Supabase list often takes just the folder name. 
        // Let's try sending just the folder name first.
    }

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
          order: 'desc', // Newest first usually better
        },
      }),
    });

    if (!response.ok) {
      console.error(`Error listing bucket ${bucketName} prefix ${prefix}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Filter out placeholders and ensure we are getting files, not just the folder itself if returned
    return data.filter((file: SupabaseFile) => 
      !file.name.endsWith('.emptyFolderPlaceholder') && 
      file.name !== prefix // Don't list the folder itself
    );
  } catch (error) {
    console.error("Supabase List Error:", error);
    return [];
  }
};

export const getFileUrl = (bucketName: string, fileName: string): string => {
  // If fileName already contains the bucket info or full path, handle it.
  // Standard supabase list returns "folder/file.ext" relative to bucket root.
  const path = fileName.startsWith('/') ? fileName.substring(1) : fileName;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${path}`;
};

export const uploadBase64Image = async (base64Data: string, fileName: string): Promise<string | null> => {
  try {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Upload specifically to 'generated' folder in 'src' bucket
    const path = `generated/${fileName}`;
    const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${path}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'image/png',
      },
      body: blob,
    });

    if (!response.ok) {
      console.error("Upload failed:", response.status);
      return null;
    }

    return getFileUrl(BUCKET_NAME, path);
  } catch (error) {
    console.error("Supabase Upload Error:", error);
    return null;
  }
};