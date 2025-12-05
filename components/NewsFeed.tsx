import React, { useState, useEffect } from 'react';
import { searchNews } from '../services/geminiService';
import { fetchLatestNewsFromDB, saveNewsToDB } from '../services/supabaseService';

const NEWS_TOPIC_KEY = "PAA_GENERAL_UPDATE";
const NEWS_SEARCH_PROMPT = "Programa de Aquisição de Alimentos PAA MDS agricultura familiar Brasil notícias recentes";

export const NewsFeed: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [source, setSource] = useState<'cache' | 'live'>('cache');

  // Load from DB first
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const cachedNews = await fetchLatestNewsFromDB(NEWS_TOPIC_KEY);
      
      if (cachedNews) {
        setContent(cachedNews.content);
        setLastUpdated(new Date(cachedNews.created_at).toLocaleString('pt-BR'));
        setSource('cache');
        setLoading(false);
      } else {
        // If no cache exists, fetch live automatically
        handleLiveUpdate();
      }
    };
    loadInitialData();
  }, []);

  const handleLiveUpdate = async () => {
    setLoading(true);
    setSource('live');
    
    // 1. Fetch from Gemini
    const result = await searchNews(NEWS_SEARCH_PROMPT);
    setContent(result);
    setLastUpdated('Agora (Não salvo)');

    // 2. Save to Supabase (Fire and forget logic usually, but we await here for UI consistency)
    if (result && !result.includes("Erro")) {
        const saved = await saveNewsToDB(NEWS_TOPIC_KEY, result);
        if (saved) {
            setLastUpdated(new Date().toLocaleString('pt-BR'));
            setSource('live'); // It's live data that is now stored
        }
    }
    
    setLoading(false);
  };

  // Simple Markdown Parser to React Elements
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    // Split by horizontal rule or double newline to roughly separate articles
    const sections = text.split(/---|___/g);

    return sections.map((section, index) => {
      if (!section.trim()) return null;

      // Extract parts using regex
      // Convert Markdown links [text](url) to <a> tags
      let htmlContent = section
        .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-gray-900 mt-4 mb-2">$1</h3>')
        .replace(/^\*\*Fonte:\*\*(.*)$/gm, '<p class="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">Fonte: $1</p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 hover:underline font-medium break-words">$1 <span class="material-icons-round text-[10px] align-middle">open_in_new</span></a>')
        .replace(/\n/g, '<br />');

      return (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-4 hover:border-blue-200 transition-colors">
           <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="text-gray-700 leading-relaxed text-sm" />
        </div>
      );
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Notícias em Tempo Real</h2>
          <div className="text-blue-100 text-sm opacity-90 flex items-center gap-2">
            <span>Monitoramento PAA</span>
            {lastUpdated && (
                <>
                    <span>•</span>
                    <span className="bg-blue-900/30 px-2 py-0.5 rounded text-xs border border-blue-400/30">
                        Atualizado: {lastUpdated}
                    </span>
                </>
            )}
            {source === 'cache' && !loading && (
                <span className="material-icons-round text-xs opacity-70" title="Dados recuperados do histórico">history</span>
            )}
          </div>
        </div>
        <button 
          onClick={handleLiveUpdate} 
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 text-sm font-bold shadow-sm whitespace-nowrap"
        >
          <span className={`material-icons-round ${loading ? 'animate-spin' : ''}`}>
            {loading ? 'sync' : 'refresh'}
          </span>
          {loading ? 'Buscando Google...' : 'Atualizar Agora'}
        </button>
      </div>
      
      <div>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {renderMarkdown(content)}
          </div>
        )}
      </div>
    </div>
  );
};
