import React, { useState, useEffect } from 'react';
import { generateImage, generateCreativePrompt } from '../services/geminiService';
import { uploadBase64Image, listBucketFiles, getFileUrl, deleteFile } from '../services/supabaseService';
import { SupabaseFile } from '../types';

export const ImageStudio: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<SupabaseFile[]>([]);
  const [status, setStatus] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [mode, setMode] = useState<'art' | 'infographic'>('art');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchGeneratedImages = async () => {
    // List files inside the 'generated' folder of 'src' bucket
    const files = await listBucketFiles('src', 'generated');
    // Sort logic: Supabase usually returns oldest first or alphabetical. 
    // We reverse to show newest first.
    setGeneratedImages(files.reverse()); 
  };

  useEffect(() => {
    fetchGeneratedImages();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setStatus(customPrompt 
      ? `✨ Planejando ${mode === 'art' ? 'arte' : 'infográfico'} sobre o tema...` 
      : `🎲 Sorteando ${mode === 'art' ? 'inspiração visual' : 'dados técnicos'}...`
    );
    
    try {
      // 1. Generate Prompt (uses customPrompt if available, otherwise random)
      const creativePrompt = await generateCreativePrompt(customPrompt, mode);
      setStatus('🎨 Renderizando visualização...');
      console.log("Prompt Gerado:", creativePrompt); // Debug

      // 2. Generate Image
      const base64Data = await generateImage(creativePrompt);
      
      if (base64Data) {
        setStatus('💾 Salvando criação na galeria...');
        const fileName = `paa_${mode}_${Date.now()}.png`;
        const publicUrl = await uploadBase64Image(base64Data, fileName);
        
        if (publicUrl) {
          setStatus('✨ Concluído!');
          setCustomPrompt(''); // Clear input on success
          await fetchGeneratedImages();
        } else {
          setStatus('❌ Erro ao salvar imagem no banco.');
        }
      } else {
        setStatus('❌ Erro ao gerar imagem com IA.');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Erro inesperado no processo.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleDelete = async (file: SupabaseFile) => {
    if (!window.confirm("Tem certeza que deseja excluir esta imagem permanentemente?")) return;

    setDeletingId(file.id);
    
    // Explicitly handle the path. The file name from listBucketFiles usually doesn't include the folder prefix if we listed inside it.
    const fullPath = file.name.startsWith('generated/') ? file.name : `generated/${file.name}`;
    
    const success = await deleteFile('src', fullPath);
    if (success) {
      setGeneratedImages(prev => prev.filter(item => item.id !== file.id));
    } else {
      alert("Erro ao excluir arquivo. Verifique o console.");
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Compact Generator Control Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Icon & Title */}
          <div className="flex items-center gap-4 md:w-1/4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${mode === 'art' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
              <span className="material-icons-round text-2xl">
                {mode === 'art' ? 'auto_awesome' : 'analytics'}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Estúdio Criativo</h2>
              <p className="text-xs text-gray-500">Crie visuais do PAA com IA</p>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMode('art')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === 'art' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="material-icons-round text-xs">palette</span>
              Arte
            </button>
            <button
              onClick={() => setMode('infographic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === 'infographic' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="material-icons-round text-xs">schema</span>
              Infográfico
            </button>
          </div>
        </div>

        {/* Input & Actions */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={mode === 'art' 
                ? "Opcional: Descreva a arte (ex: Trator futurista no campo)" 
                : "Opcional: Descreva o dado (ex: Fluxo da lei 14.628)"
              }
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`whitespace-nowrap flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 ${
                mode === 'art' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span className="material-icons-round text-lg">
                  {customPrompt ? (mode === 'art' ? 'palette' : 'schema') : 'shuffle'}
                </span>
              )}
              {loading 
                ? 'Criando...' 
                : customPrompt 
                  ? (mode === 'art' ? 'Gerar Arte' : 'Gerar Gráfico') 
                  : 'Surpreenda-me'
              }
            </button>
          </div>
          
          {/* Status Bar */}
          <div className="mt-2 h-5">
            {status && (
              <p className={`text-xs font-medium animate-pulse flex items-center gap-1 ${mode === 'art' ? 'text-purple-600' : 'text-blue-600'}`}>
                <span className="material-icons-round text-[14px]">info</span> {status}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="pt-2">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 px-1">
          <span className="material-icons-round text-purple-600">collections</span>
          Galeria de Criações
        </h3>
        
        {generatedImages.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
            <span className="material-icons-round text-5xl mb-3 opacity-30">brush</span>
            <p className="font-medium">Sua galeria está vazia.</p>
            <p className="text-sm opacity-70">Use o painel acima para criar a primeira arte!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generatedImages.map((file) => {
              const fullPath = file.name.startsWith('generated/') ? file.name : `generated/${file.name}`;
              const url = getFileUrl('src', fullPath);
              const isInfo = file.name.includes('infographic');
              const isDeleting = deletingId === file.id;

              return (
                <div key={file.id} className={`group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
                  <img 
                    src={url} 
                    alt={file.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  {/* Badge for Type */}
                  {isInfo && (
                    <div className="absolute top-2 right-2 bg-blue-600/90 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm z-10">
                      Info
                    </div>
                  )}
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                      title="Visualizar Fullscreen"
                    >
                      <span className="material-icons-round">fullscreen</span>
                    </a>
                    
                    <button 
                      onClick={() => handleDelete(file)}
                      disabled={isDeleting}
                      className="w-10 h-10 bg-red-500/80 backdrop-blur-md border border-red-400/50 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Excluir imagem"
                    >
                      {isDeleting ? (
                        <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <span className="material-icons-round">delete</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};