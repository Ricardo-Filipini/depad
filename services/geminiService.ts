import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_API_KEY } from "../constants";

// Helper to get client safely without crashing app on load if key is missing
const getClient = () => {
    if (!GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. AI features will not work.");
      return null;
    }
    return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
};

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const ai = getClient();
    if (!ai) return "Erro de configuração: Chave de API (GEMINI_API_KEY) não encontrada. Verifique as variáveis de ambiente.";

    // Optimization: gemini-2.5-flash is much faster and cheaper for chat interactions
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced creativity and accuracy
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar sua resposta. Por favor, tente novamente.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Desculpe, estou enfrentando dificuldades técnicas no momento. Tente novamente em alguns instantes.";
  }
};

export const searchNews = async (topic: string): Promise<string> => {
  try {
    const ai = getClient();
    if (!ai) return "Erro: Chave de API não configurada.";

    // Optimization: gemini-2.5-flash is significantly faster for search grounding tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um curador de notícias especializado em políticas públicas brasileiras.
      Realize uma busca no Google sobre: "${topic}".
      
      Requisitos obrigatórios:
      1. Idioma: Português do Brasil (PT-BR).
      2. Foco: Notícias RECENTES (últimos meses) e RELEVANTES sobre o PAA (Programa de Aquisição de Alimentos), MDS e agricultura familiar.
      3. Formato: Retorne um texto formatado em Markdown limpo.
      4. Citações: Para CADA notícia, você DEVE incluir o link da fonte original explicitamente no formato Markdown [Nome da Fonte](url).
      
      Estrutura para cada notícia:
      ### Título da Notícia
      **Resumo:** Resumo conciso em 2 linhas.
      **Fonte:** [Nome do Veículo](url_original)
      
      ---
      `,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3, // Lower temperature for more factual results
      },
    });
    return response.text || "Nenhuma notícia encontrada no momento.";
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return "Não foi possível carregar as notícias. Por favor, verifique sua conexão ou tente mais tarde.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    try {
        const ai = getClient();
        if (!ai) return null;

        // We keep Pro for images as quality is paramount here, even if slightly slower
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K"
                }
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                // Ensure we return null if data is undefined, fixing type mismatch
                return part.inlineData.data || null; 
            }
        }
        return null;
    } catch (error) {
        console.error("Image Gen Error", error);
        return null;
    }
};

export const generateCreativePrompt = async (userTopic?: string): Promise<string> => {
  const fallbacks = [
    "A futuristic digital dashboard displaying agricultural data maps of Brazil, glowing holographic interface, professional UX design, 8k resolution.",
    "Isometric 3D illustration of a farm connected to a cloud server, showing data flowing from vegetables to a database, colorful and clean.",
    "Portrait of a brazilian female farmer using a tablet in a corn field, golden hour lighting, national geographic style photography.",
    "Abstract data visualization composed of fruits and vegetables forming a network graph, white background, minimalist design."
  ];

  try {
    const ai = getClient();
    if (!ai) return fallbacks[0];

    // Build the instruction based on whether userTopic exists
    const contextInstruction = userTopic 
      ? `O usuário forneceu este tema específico: "${userTopic}". Crie um prompt visual baseado estritamente nisso, mas melhore a descrição artística.`
      : `Escolha ALEATORIAMENTE um tema entre: Fluxo Logístico do DEPAD, Tecnologia de Dados, Leis/Governança, Agricultores Familiares ou Alimentos Frescos.`;

    // Flash is perfectly capable of generating prompts and is much faster
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Atue como um Diretor de Arte Criativo para a plataforma de dados do PAA (Programa de Aquisição de Alimentos).
        Sua missão é criar um prompt visual em INGLÊS para gerar uma imagem.

        CONTEXTO:
        ${contextInstruction}

        DIRETRIZES DE ESTILO:
        Escolha um estilo visual adequado (Fotorealismo, 3D Pixar, Isométrico, Futurista ou Minimalista).
        Descreva a cena, a iluminação e o ângulo da câmera.

        RETORNE APENAS O PROMPT EM INGLÊS. NÃO ADICIONE NENHUM TEXTO ANTES OU DEPOIS.
      `,
    });
    return response.text || fallbacks[Math.floor(Math.random() * fallbacks.length)];
  } catch (error) {
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}