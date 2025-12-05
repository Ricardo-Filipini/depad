import { SUPABASE_KEY, SUPABASE_URL } from '../constants';
import { SupabaseFile } from '../types';

const BUCKET_NAME = 'src';

// --- STORAGE FUNCTIONS ---

export const listBucketFiles = async (bucketName: string, folderPath: string = ''): Promise<SupabaseFile[]> => {
  try {
    let prefix = folderPath.startsWith('/') ? folderPath.substring(1) : folderPath;
    
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
          order: 'desc', 
        },
      }),
    });

    if (!response.ok) {
      console.error(`Error listing bucket ${bucketName} prefix ${prefix}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    return data.filter((file: SupabaseFile) => 
      !file.name.endsWith('.emptyFolderPlaceholder') && 
      file.name !== prefix 
    );
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
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

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

export const deleteFile = async (bucketName: string, fileName: string): Promise<boolean> => {
  try {
    // Ensure full path (if file is in a folder, fileName should include it)
    const path = fileName.startsWith('/') ? fileName.substring(1) : fileName;
    
    // Use the batch delete endpoint which is generally more reliable and avoids URL encoding edge cases
    // Endpoint: DELETE /storage/v1/object/{bucketName}
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prefixes: [path]
      })
    });

    return response.ok;
  } catch (error) {
    console.error("Supabase Delete Error:", error);
    return false;
  }
};

// --- DATABASE FUNCTIONS (News Cache) ---

export interface NewsCacheItem {
  id: number;
  topic: string;
  content: string;
  created_at: string;
}

export const fetchLatestNewsFromDB = async (topic: string): Promise<NewsCacheItem | null> => {
  try {
    // REST API call to get the latest item for a specific topic
    const params = new URLSearchParams({
      topic: `eq.${topic}`,
      select: '*',
      order: 'created_at.desc',
      limit: '1'
    });

    const response = await fetch(`${SUPABASE_URL}/rest/v1/news_cache?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return null;
  }
};

export const saveNewsToDB = async (topic: string, content: string): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/news_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        topic,
        content
      })
    });

    return response.ok;
  } catch (error) {
    console.error("DB Save Error:", error);
    return false;
  }
};