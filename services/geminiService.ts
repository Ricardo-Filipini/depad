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

export const generateCreativePrompt = async (): Promise<string> => {
  const fallbacks = [
    "A futuristic digital dashboard displaying agricultural data maps of Brazil, glowing holographic interface, professional UX design, 8k resolution.",
    "Isometric 3D illustration of a farm connected to a cloud server, showing data flowing from vegetables to a database, colorful and clean.",
    "Portrait of a brazilian female farmer using a tablet in a corn field, golden hour lighting, national geographic style photography.",
    "Abstract data visualization composed of fruits and vegetables forming a network graph, white background, minimalist design."
  ];

  try {
    const ai = getClient();
    if (!ai) return fallbacks[0];

    // Flash is perfectly capable of generating prompts and is much faster
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Atue como um Diretor de Arte Criativo para a plataforma de dados do PAA (Programa de Aquisição de Alimentos).
        Sua missão é criar um prompt visual em INGLÊS para gerar uma imagem ÚNICA e VARIADA.

        1. Escolha ALEATORIAMENTE um destes TEMAS:
           - Fluxo Logístico do DEPAD: Caminhões, armazéns, caixas de alimentos sendo organizadas, transporte.
           - Tecnologia de Dados: Servidores, fibra óptica conectada a plantações, hologramas de gráficos sobre o mapa do Brasil.
           - Governança e Leis: Uma representação abstrata ou infográfico 3D sobre leis protegendo a agricultura.
           - O Humano: Agricultores familiares (foco em diversidade: mulheres, indígenas, quilombolas) usando tecnologia ou colhendo.
           - Alimentos Frescos: Close-up macro de frutas e verduras brasileiras com iluminação de estúdio.

        2. Escolha ALEATORIAMENTE um destes ESTILOS VISUAIS:
           - Fotorealismo estilo National Geographic (Cinematic Lighting).
           - Ilustração 3D estilo Pixar/Disney (Fofo e colorido).
           - Arte Vetorial Isométrica (Estilo Tech Startup, limpo, fundo sólido).
           - Futurista/Cyberpunk (Neon, dados brilhantes, dark mode).
           - Infográfico Minimalista (Flat design, cores pastéis).
           - Pintura a Óleo Clássica (Textura de tela, dramático).

        3. Gere o prompt descrevendo a cena, a iluminação, o ângulo da câmera e o estilo escolhido.
        
        RETORNE APENAS O PROMPT EM INGLÊS. NÃO ADICIONE NENHUM TEXTO ANTES OU DEPOIS.
      `,
    });
    return response.text || fallbacks[Math.floor(Math.random() * fallbacks.length)];
  } catch (error) {
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}