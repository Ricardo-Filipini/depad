export enum Section {
  DASHBOARD = 'dashboard',
  INSTITUTIONAL = 'institutional',
  GOVERNANCE = 'governance',
  LEGISLATION = 'legislation',
  MEDIA = 'media',
  NEWS = 'news',
  CHAT = 'chat',
  STUDIO = 'studio'
}

export interface PAAInfo {
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface SupabaseFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

export interface NewsArticle {
  title: string;
  url: string;
  source?: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}