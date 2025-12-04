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
      const data = await listBucketFiles(bucketName, folder);
      setFiles(data);
      setLoading(false);
    };
    fetchFiles();
  }, [folder]);

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {!loading && files.length > 0 && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            {files.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="p-8 bg-white rounded-xl text-center text-gray-400 border border-gray-100 shadow-sm">
          <span className="material-icons-round text-3xl mb-2 opacity-50">folder_off</span>
          <p className="text-sm">Nenhum arquivo encontrado em <code>{bucketName}/{folder}</code></p>
        </div>
      ) : (
        <div className={`grid gap-4 ${
          displayMode === 'list' 
            ? 'grid-cols-1' 
            : type === 'video' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {files.map((file) => {
            // listBucketFiles returns `name` relative to the bucket root IF using prefix?
            // Actually supabase usually returns "folder/filename.ext" in the name field if searched with prefix.
            // If it returns just "filename.ext", we need to prepend folder.
            // Let's check if name contains the folder.
            
            let fullPath = file.name;
            if (!fullPath.startsWith(folder) && folder !== '') {
                fullPath = `${folder}/${file.name}`;
            }
            
            const url = getFileUrl(bucketName, fullPath);
            const fileNameClean = file.name.split('/').pop() || file.name;

            if (displayMode === 'list') {
               return (
                 <a 
                    key={file.id} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-green-500 hover:shadow-md transition-all group"
                 >
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                       <span className="material-icons-round text-xl">picture_as_pdf</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-medium text-gray-900 text-sm group-hover:text-green-700 transition-colors truncate" title={fileNameClean}>
                         {fileNameClean.replace(/_/g, ' ').replace(/\.pdf$/i, '')}
                       </h3>
                       <p className="text-[10px] text-gray-400 mt-0.5">
                         {file.metadata ? (file.metadata.size / 1024).toFixed(0) + ' KB' : 'PDF'}
                       </p>
                    </div>
                    <span className="material-icons-round text-gray-300 group-hover:text-green-500 text-sm">open_in_new</span>
                 </a>
               )
            }

            return (
              <div key={file.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="aspect-video bg-gray-50 relative overflow-hidden flex items-center justify-center group-hover:bg-white transition-colors">
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
                      <span className="material-icons-round text-4xl mb-2">picture_as_pdf</span>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 truncate mb-1 text-xs" title={fileNameClean}>
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
                      className="text-green-600 hover:text-green-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      {type === 'image' ? 'Ver' : type === 'video' ? 'Play' : 'Ler'}
                      <span className="material-icons-round text-[12px]">arrow_outward</span>
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