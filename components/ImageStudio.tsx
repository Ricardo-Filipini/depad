import React, { useState, useEffect } from 'react';
import { generateImage, generateCreativePrompt } from '../services/geminiService';
import { uploadBase64Image, listBucketFiles, getFileUrl } from '../services/supabaseService';
import { SupabaseFile } from '../types';

export const ImageStudio: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<SupabaseFile[]>([]);
  const [status, setStatus] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');

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
    setStatus(customPrompt ? '✨ Refinando sua ideia com IA...' : '🎲 Sorteando tema e estilo visual...');
    
    try {
      // 1. Generate Prompt (uses customPrompt if available, otherwise random)
      const creativePrompt = await generateCreativePrompt(customPrompt);
      setStatus('🎨 Pincelando pixels com IA...');
      console.log("Prompt Gerado:", creativePrompt); // Debug

      // 2. Generate Image
      const base64Data = await generateImage(creativePrompt);
      
      if (base64Data) {
        setStatus('💾 Revelando e salvando imagem...');
        const fileName = `paa_creative_${Date.now()}.png`;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Compact Generator Control Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
        
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-4 md:w-1/4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-icons-round text-2xl">auto_awesome</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Estúdio Criativo</h2>
            <p className="text-xs text-gray-500">Crie visuais do PAA com IA</p>
          </div>
        </div>

        {/* Middle: Input & Actions */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Opcional: Descreva o que você quer (ex: Trator futurista)"
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="whitespace-nowrap flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span className="material-icons-round text-lg">
                  {customPrompt ? 'palette' : 'shuffle'}
                </span>
              )}
              {loading ? 'Criando...' : customPrompt ? 'Gerar Arte' : 'Surpreenda-me'}
            </button>
          </div>
          
          {/* Status Bar */}
          <div className="mt-2 h-5">
            {status && (
              <p className="text-xs text-purple-600 font-medium animate-pulse flex items-center gap-1">
                <span className="material-icons-round text-[14px]">info</span> {status}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Section - Main Focus */}
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
              const fullPath = file.name.includes('/') ? file.name : `generated/${file.name}`;
              const url = getFileUrl('src', fullPath);

              return (
                <div key={file.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                  <img 
                    src={url} 
                    alt={file.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
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