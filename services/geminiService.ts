import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_API_KEY } from "../constants";

// Initialize Gemini with the key from constants (which handles VITE_ env vars)
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const sendMessage = async (message: string): Promise<string> => {
  try {
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

export const generateCreativePrompt = async (): Promise<string> => {
  try {
    // Flash is perfectly capable of generating prompts and is much faster
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Crie um prompt visual altamente detalhado e inspirador, em INGLÊS, para gerar uma imagem fotorealista, estilo 'National Geographic' ou ilustração 3D 'Pixar style', sobre o Programa de Aquisição de Alimentos (PAA) no Brasil. \n\nTemas: Agricultores felizes, alimentos frescos (frutas, verduras tropicais), caminhões de entrega, tecnologia no campo. \n\nRetorne APENAS o prompt em inglês.",
    });
    return response.text || "Brazilian family farmers harvesting fresh organic vegetables in a sunny field, high resolution, cinematic lighting, 8k.";
  } catch (error) {
    return "Brazilian family farmers holding fresh organic vegetables, sunny day, high resolution photography, cinematic lighting.";
  }
}