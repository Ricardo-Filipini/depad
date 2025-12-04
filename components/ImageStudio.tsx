import React, { useState, useEffect } from 'react';
import { generateImage, generateCreativePrompt } from '../services/geminiService';
import { uploadBase64Image, listBucketFiles, getFileUrl } from '../services/supabaseService';
import { SupabaseFile } from '../types';

export const ImageStudio: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<SupabaseFile[]>([]);
  const [status, setStatus] = useState<string>('');

  const fetchGeneratedImages = async () => {
    const files = await listBucketFiles('src', 'generated');
    // Sort logic can be added if files have metadata, otherwise relying on list order
    // Supabase list default order is usually alphabetical
    setGeneratedImages(files.reverse()); // Show newest first if they are named by timestamp
  };

  useEffect(() => {
    fetchGeneratedImages();
  }, []);

  const handleAutoGenerate = async () => {
    setLoading(true);
    setStatus('💡 Criando prompt criativo com Gemini...');
    
    try {
      // 1. Generate Prompt
      const creativePrompt = await generateCreativePrompt();
      setStatus(`🎨 Gerando imagem...`);

      // 2. Generate Image
      const base64Data = await generateImage(creativePrompt);
      
      if (base64Data) {
        setStatus('💾 Salvando imagem no Supabase...');
        const fileName = `paa_creative_${Date.now()}.png`;
        const publicUrl = await uploadBase64Image(base64Data, fileName);
        
        if (publicUrl) {
          setStatus('✅ Concluído! Atualizando galeria...');
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
    <div className="space-y-8 animate-fade-in">
      {/* Generator Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <span className="material-icons-round text-9xl text-purple-500">brush</span>
        </div>
        
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl mx-auto flex items-center justify-center text-white mb-6 shadow-xl transform rotate-3">
          <span className="material-icons-round text-4xl">auto_awesome</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Estúdio Criativo PAA</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
          Nossa IA gera ilustrações únicas sobre agricultura familiar e segurança alimentar. Clique abaixo e veja a mágica acontecer.
        </p>

        <button
          onClick={handleAutoGenerate}
          disabled={loading}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Criando...</span>
            </>
          ) : (
            <>
              <span className="material-icons-round">shutter_speed</span>
              <span>Gerar Nova Arte</span>
            </>
          )}
        </button>

        {status && (
          <div className="mt-6 flex justify-center">
             <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold animate-pulse border border-purple-100">
               {status}
             </span>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 px-2">
          <span className="material-icons-round text-purple-600">collections</span>
          Galeria de Criações
        </h3>
        
        {generatedImages.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
            <span className="material-icons-round text-4xl mb-2 opacity-50">image_not_supported</span>
            <p>Nenhuma imagem gerada ainda. Experimente o botão acima!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {generatedImages.map((file) => {
              // Ensure path construction matches listBucketFiles output
              const url = getFileUrl('src', file.name);

              return (
                <div key={file.id} className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-200">
                  <img 
                    src={url} 
                    alt={file.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
                    >
                      <span className="material-icons-round text-sm">fullscreen</span>
                      Visualizar
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