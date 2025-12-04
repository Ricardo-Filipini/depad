import React, { useEffect, useState } from 'react';
import { listBucketFiles, getFileUrl } from '../services/supabaseService';
import { SupabaseFile } from '../types';

interface MediaGalleryProps {
  folder: string; // e.g., 'infografico', 'lei'
  title: string;
  type: 'image' | 'video' | 'pdf';
  displayMode?: 'grid' | 'list';
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ folder, title, type, displayMode = 'grid' }) => {
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const bucketName = 'src'; 

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      // Pass the folder prefix. listBucketFiles handles the API call.
      const data = await listBucketFiles(bucketName, folder);
      setFiles(data);
      setLoading(false);
    };
    fetchFiles();
  }, [folder]);

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {!loading && files.length > 0 && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase tracking-wide">
            {files.length} itens
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-xl text-center text-gray-500 border border-dashed border-gray-300">
          <p className="mb-2 text-lg">📁</p>
          <p>Nenhum arquivo encontrado em <code>{bucketName}/{folder}</code></p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          displayMode === 'list' 
            ? 'grid-cols-1' 
            : type === 'video' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {files.map((file) => {
            // Check if file.name is the full path or relative.
            // Typically supabase list returns "folder/file.ext"
            const url = getFileUrl(bucketName, file.name);
            const fileNameClean = file.name.split('/').pop() || file.name;

            if (displayMode === 'list') {
               return (
                 <a 
                    key={file.id} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                 >
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                       <span className="material-icons-round text-2xl">picture_as_pdf</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors truncate" title={fileNameClean}>
                         {fileNameClean.replace(/_/g, ' ').replace(/\.pdf$/i, '')}
                       </h3>
                       <p className="text-xs text-gray-500 mt-1">
                         {file.metadata ? (file.metadata.size / 1024).toFixed(0) + ' KB' : 'Documento PDF'}
                       </p>
                    </div>
                    <span className="material-icons-round text-gray-300 group-hover:text-green-500">open_in_new</span>
                 </a>
               )
            }

            return (
              <div key={file.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  {type === 'image' && (
                    <img src={url} alt={fileNameClean} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  )}
                  {type === 'video' && (
                    <video controls className="w-full h-full object-cover">
                      <source src={url} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  )}
                  {type === 'pdf' && (
                    <div className="flex flex-col items-center justify-center text-red-500">
                      <span className="material-icons-round text-5xl mb-2">picture_as_pdf</span>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 truncate mb-2 text-sm" title={fileNameClean}>
                    {fileNameClean.replace(/_/g, ' ').replace(/\.pdf$|\.png$|\.jpg$|\.mp4$/i, '')}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono">
                      {file.metadata ? (file.metadata.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
                    </span>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      {type === 'image' ? 'Ampliar' : type === 'video' ? 'Ver' : 'Ler'}
                      <span className="material-icons-round text-[14px]">arrow_outward</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};