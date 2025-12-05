import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, GEMINI_API_KEY, PAA_CONTENT } from "../constants";

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

export const generateCreativePrompt = async (userTopic?: string, mode: 'art' | 'infographic' = 'art'): Promise<string> => {
  const artFallbacks = [
    "A futuristic digital dashboard displaying agricultural data maps of Brazil, glowing holographic interface, professional UX design, 8k resolution.",
    "Isometric 3D illustration of a farm connected to a cloud server, showing data flowing from vegetables to a database, colorful and clean.",
    "Portrait of a brazilian female farmer using a tablet in a corn field, golden hour lighting, national geographic style photography.",
  ];

  const infoFallbacks = [
    "A clean, flat design infographic showing the flow of food from farm to school. Title: 'PAA Flow'. White background, vector style.",
    "A mind map diagram showing 'PAA Data Governance' with nodes for 'MDS', 'Conab', and 'Teradata'. Professional corporate presentation style.",
    "A timeline infographic illustrating the PAA Legislation history, minimal vector art, high contrast."
  ];

  try {
    const ai = getClient();
    if (!ai) return mode === 'art' ? artFallbacks[0] : infoFallbacks[0];

    // Prepare context from PAA_CONTENT to help the model be specific
    const platformContext = PAA_CONTENT.map(c => `${c.title}: ${c.description}`).join('; ');
    
    let systemInstruction = "";
    let contextInstruction = "";

    if (mode === 'infographic') {
      systemInstruction = `
        Atue como um Especialista em Visualização de Dados e Design de Informação.
        Sua missão é criar um prompt visual DETALHADO em INGLÊS para gerar um INFOGRÁFICO, MAPA MENTAL ou FLUXOGRAMA.
        
        REGRAS CRÍTICAS PARA INFOGRÁFICOS:
        1. Use estilos: "Flat Vector", "Clean Design", "Corporate Infographic" ou "Minimalist Chart".
        2. Fundo branco ou neutro sólido para legibilidade máxima.
        3. Visual Storytelling: Use ícones, setas e hierarquia visual clara.
        4. **PORTUGUÊS OBRIGATÓRIO:** Instrua explicitamente o gerador a escrever quaisquer títulos ou rótulos visíveis em PORTUGUÊS (PT-BR).
           - Exemplo: "Include the title 'Ciclo do PAA' in bold typography".
           - Exemplo: "Label the steps as 'Adesão', 'Entrega' and 'Pagamento'".
        
        Contexto técnico do PAA: ${platformContext}
      `;
      
      contextInstruction = userTopic 
        ? `Crie um prompt para um infográfico detalhando: "${userTopic}". Garanta que os termos técnicos estejam em Português.`
        : `Escolha um tema: Fluxo de Dados (Adesão -> Pagamento), Governança (MDS/Conab) ou Inclusão Social. Descreva os rótulos em Português.`;
    
    } else {
      // Art Mode
      systemInstruction = `
        Atue como um Diretor de Arte Criativo.
        Sua missão é criar um prompt visual em INGLÊS para gerar uma imagem artística, fotografia ou ilustração 3D.
        Estilos: Fotorealismo, 3D Pixar, Isométrico, Futurista ou Minimalista.
        Foque na estética visual, iluminação e composição.
      `;
      
      contextInstruction = userTopic 
        ? `O usuário forneceu este tema: "${userTopic}". Crie uma descrição artística visualmente impactante.`
        : `Escolha ALEATORIAMENTE um tema entre: Tecnologia no Campo Brasileiro, Agricultura Familiar Moderna, ou Alimentos Frescos e Dados.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        ${systemInstruction}
        
        PEDIDO:
        ${contextInstruction}

        RETORNE APENAS O PROMPT EM INGLÊS. NÃO ADICIONE NENHUM TEXTO ANTES OU DEPOIS.
      `,
    });
    
    return response.text || (mode === 'art' ? artFallbacks[0] : infoFallbacks[0]);
  } catch (error) {
    return mode === 'art' 
      ? artFallbacks[Math.floor(Math.random() * artFallbacks.length)] 
      : infoFallbacks[Math.floor(Math.random() * infoFallbacks.length)];
  }
}