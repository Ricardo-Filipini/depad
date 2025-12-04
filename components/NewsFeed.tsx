import React, { useState, useEffect } from 'react';
import { searchNews } from '../services/geminiService';

export const NewsFeed: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const result = await searchNews("Programa de Aquisição de Alimentos PAA MDS agricultura familiar Brasil notícias recentes");
    setContent(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Notícias em Tempo Real</h2>
          <p className="text-blue-100 text-sm opacity-90">Monitoramento ativo do PAA e Agricultura Familiar via Google Search</p>
        </div>
        <button 
          onClick={fetchNews} 
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-sm font-medium"
        >
          <span className={`material-icons-round ${loading ? 'animate-spin' : ''}`}>refresh</span>
          {loading ? 'Atualizando...' : 'Atualizar'}
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