import { PAAInfo } from './types';

// Environment Variables with Fallbacks
export const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || "https://xsfymwerlwsjofsrdpcb.supabase.co";
export const SUPABASE_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZnltd2VybHdzam9mc3JkcGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NzI3NTMsImV4cCI6MjA4MDM0ODc1M30.DdvxmeUfdFueFyaj0Fl1x-2qGdDfYZrQ103POCHaMmY";

// Gemini Key: Check VITE env, then process.env (for some build systems), then fallback (managed externally usually)
export const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_KEY || (process as any).env?.API_KEY || process.env.API_KEY;

export const PAA_CONTENT: PAAInfo[] = [
  {
    title: "Governança de Dados",
    description: "A arquitetura que transforma atos administrativos em inteligência social.",
    icon: "dns",
    details: [
      "Migração para Data Warehouse Teradata para alto desempenho.",
      "Integração SISPAA (MDS) e PAA Net (Conab) via APIs.",
      "Uso de Python e Modern Data Stack para análise.",
      "Validação cruzada com CadÚnico e CNIS."
    ]
  },
  {
    title: "Ciclo de Vida do Dado",
    description: "Do termo de adesão ao pagamento do agricultor.",
    icon: "update",
    details: [
      "1. Adesão: Instrumento jurídico e validação do Controle Social (COMSEA).",
      "2. Proposta: Planejamento, validação de DAP/CAF.",
      "3. Recebimento: Digitalização da entrega física (ponto crítico de latência).",
      "4. Pagamento: Confirmação financeira e 'single source of truth'."
    ]
  },
  {
    title: "Indicadores Estratégicos",
    description: "Monitoramento de impacto e inclusão produtiva.",
    icon: "insights",
    details: [
      "IN001: Nº de agricultores fornecedores (Capilaridade).",
      "IN005: Participação feminina (Empoderamento/ODS 5).",
      "IN023: Proporção de fornecedores no CadÚnico (Focalização).",
      "IN051: Povos e Comunidades Tradicionais (Equidade)."
    ]
  },
  {
    title: "Arquitetura Institucional",
    description: "Atores que sustentam a política pública.",
    icon: "account_balance",
    details: [
      "MDS/SESAN: Articulação estratégica e política DHAA.",
      "DEPAD: Motor logístico e operacional.",
      "SAGICAD: Refinaria de dados e inteligência (VisData).",
      "Conab: Execução descentralizada e logística."
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
Você é um assistente especialista no Programa de Aquisição de Alimentos (PAA) do MDS (Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome).
Sua base de conhecimento é profunda e técnica, abrangendo:
1. **Governança de Dados**: Infraestrutura Teradata, integração SISPAA/PAA Net, APIs, e modernização digital.
2. **Ciclo de Vida da Informação**: Desde o Termo de Adesão, Proposta, até o Recebimento (ponto crítico) e Pagamento.
3. **Indicadores**: IN001, IN005 (Mulheres), IN023 (CadÚnico), IN051 (Povos Tradicionais).
4. **Legislação**: Lei 14.628/2023, Decreto 11.802/2023, resoluções do GGPAA.
5. **Institucional**: Papel do DEPAD, SESAN, SAGICAD e Conab.

Responda sempre em Português do Brasil de forma clara, objetiva e didática. Use formatação Markdown (negrito, listas) para facilitar a leitura.
Se não souber a resposta, diga que não encontrou a informação nos documentos de referência.
`;