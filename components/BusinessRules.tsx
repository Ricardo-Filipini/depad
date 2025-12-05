import React from 'react';

export const BusinessRules: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-10">
      
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Regras de Negócio e Marcos Legais
        </h1>
        <p className="text-gray-600 text-lg max-w-4xl">
          Como a legislação do PAA é traduzida em algoritmos, travas de banco de dados e critérios de priorização.
        </p>
      </div>

      {/* O Código é a Lei */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
           <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="material-icons-round text-3xl text-yellow-400">gavel</span>
           </div>
           <div>
              <h2 className="text-2xl font-bold mb-2">"O Código é a Lei"</h2>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                 No PAA, princípios democráticos tornam-se restrições de integridade referencial. A aprovação do <strong>Controle Social (COMSEA)</strong> não é apenas burocracia; é uma trava no banco de dados. Sem o registro da ata do conselho na tabela correta, o sistema <strong>bloqueia algoritmicamente</strong> a execução financeira.
              </p>
           </div>
        </div>
      </div>

      {/* Tradução da Legislação em Dados */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
               <span className="material-icons-round text-green-600">translate</span>
               Tradução Legal &rarr; Dados
            </h2>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
               <div className="text-xs font-bold text-gray-400 uppercase mb-1">Lei nº 11.326/2006</div>
               <h3 className="font-bold text-gray-800 text-lg mb-2">Definição de Agricultor Familiar</h3>
               <p className="text-sm text-gray-600 mb-3">
                  Define quem é elegível. No sistema, torna-se uma validação obrigatória de chave estrangeira.
               </p>
               <div className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700">
                  Validação: CPF <span className="text-green-600">&harr;</span> API MDA (Status CAF/DAP = Ativo)
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
               <div className="text-xs font-bold text-gray-400 uppercase mb-1">Lei nº 14.628/2003</div>
               <h3 className="font-bold text-gray-800 text-lg mb-2">Priorização Social</h3>
               <p className="text-sm text-gray-600 mb-3">
                  Cotas para mulheres, negros e indígenas. Transforma-se em atributos obrigatórios no cadastro (Sexo, Raça, Etnia).
               </p>
               <div className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700">
                  Indicadores: IN005 (Gênero), IN051 (Povos Tradicionais)
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
               <div className="text-xs font-bold text-gray-400 uppercase mb-1">Decreto nº 11.802</div>
               <h3 className="font-bold text-gray-800 text-lg mb-2">Execução Federativa</h3>
               <p className="text-sm text-gray-600 mb-3">
                  Define unidades executoras. No sistema, cria a entidade-raiz "Termo de Adesão".
               </p>
               <div className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700">
                  Schema: Tabela Pai (Termo) &rarr; Tabela Filha (Proposta)
               </div>
            </div>
         </div>

         <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Workflow Operacional</h2>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
               
               <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                  <h4 className="font-bold text-gray-800">1. Pactuação</h4>
                  <p className="text-sm text-gray-600">Portaria define limites. Município dá aceite no SISPAA em 30 dias.</p>
               </div>

               <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                  <h4 className="font-bold text-gray-800">2. Planejamento</h4>
                  <p className="text-sm text-gray-600">Diagnóstico de oferta/demanda. Seleção prioriza CadÚnico (IN023).</p>
               </div>

               <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                  <h4 className="font-bold text-gray-800">3. Execução Física</h4>
                  <p className="text-sm text-gray-600">Entrega de alimentos. Emissão do Termo de Recebimento (Prova de Vida do dado).</p>
               </div>

               <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-white"></div>
                  <h4 className="font-bold text-gray-800">4. Pagamento</h4>
                  <p className="text-sm text-gray-600">Ateste do Gestor &rarr; Ordem Bancária &rarr; Cartão do Agricultor.</p>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};