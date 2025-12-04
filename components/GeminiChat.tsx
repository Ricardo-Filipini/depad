import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Olá! Sou o assistente virtual do PAA. Posso ajudar com informações sobre legislação, governança de dados, indicadores ou operacionalização do programa. O que você gostaria de saber?', timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await sendMessage(input);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Desculpe, tive um problema ao processar sua solicitação. Tente novamente.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-h-[800px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-green-600 p-4 flex items-center gap-3">
        <span className="material-icons-round text-white text-2xl">smart_toy</span>
        <div>
          <h2 className="text-white font-bold">Assistente PAA</h2>
          <p className="text-green-100 text-xs">Gemini 1.5 Pro</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              <div className="text-sm md:text-base whitespace-pre-wrap">{msg.text}</div>
              <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua dúvida aqui..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-gray-700"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <span className="material-icons-round text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};