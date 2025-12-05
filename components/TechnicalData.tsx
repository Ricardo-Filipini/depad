import React from 'react';

export const TechnicalData: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-10">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Estrutura e Ciclo de Vida dos Dados
        </h1>
        <p className="text-gray-600 text-lg max-w-4xl">
          Análise técnica da arquitetura de dados do PAA, desde a gênese no sistema transacional até a inteligência analítica no Teradata.
        </p>
      </div>

      {/* Arquitetura Geral */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
           <span className="material-icons-round text-blue-600">dns</span>
           Arquitetura Tecnológica Híbrida
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-green-500">
                 <h3 className="font-bold text-gray-800">Sistemas Transacionais (OLTP)</h3>
                 <p className="text-sm text-gray-600 mt-1">
                   <strong>SISPAA (MDS):</strong> Baseado em Java/JBoss. É o sistema "core" para execução via Termo de Adesão.
                 </p>
                 <p className="text-sm text-gray-600 mt-1">
                   <strong>PAA Net (Conab):</strong> Sistema corporativo da Conab. Opera com lógica de "Projetos".
                 </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                 <h3 className="font-bold text-gray-800">Espinha Dorsal Analítica (OLAP)</h3>
                 <p className="text-sm text-gray-600 mt-1">
                   <strong>Teradata EDW:</strong> Processamento Paralelo Massivo (MPP). Permite cruzar bilhões de registros do CadÚnico com o PAA.
                 </p>
                 <p className="text-sm text-gray-600 mt-1">
                   <strong>Modern Data Stack:</strong> Uso de ETL via TPT (Teradata Parallel Transporter) e Python para análise.
                 </p>
              </div>
           </div>
           
           <div className="flex flex-col justify-center space-y-4 text-sm text-gray-600">
              <p>
                 A arquitetura enfrenta o desafio da <strong>Dualidade</strong>. Dicionários de dados distintos entre MDS e Conab exigem processos complexos de ETL.
              </p>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                 <strong className="text-yellow-800 block mb-1">Solução em Curso:</strong>
                 <p>Substituição da troca de arquivos planos (CSV/TXT) por <strong>APIs REST/JSON</strong>. Isso permite interoperabilidade em tempo real e documentação padronizada (Swagger).</p>
              </div>
           </div>
        </div>
      </div>

      {/* Ciclo de Vida */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
           <span className="material-icons-round text-green-600">update</span>
           Ciclo de Vida da Informação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Fase 1 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-300 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 font-bold text-6xl text-gray-300 group-hover:text-green-200">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Gênese (Adesão)</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Instrumento Jurídico</p>
              <p className="text-sm text-gray-600">
                O "Termo de Adesão" é a entidade raiz ("Tabela Pai"). Define regras territoriais (IBGE) e bancárias.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-purple-600 font-semibold">
                 Regra: Validação COMSEA obrigatória.
              </div>
           </div>

           {/* Fase 2 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-300 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 font-bold text-6xl text-gray-300 group-hover:text-green-200">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Planejamento</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Proposta</p>
              <p className="text-sm text-gray-600">
                Dado socioeconômico. Validação de CPF/DAP/CAF. Padronização taxonômica de produtos.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-blue-600 font-semibold">
                 Define Baseline (Previsto).
              </div>
           </div>

           {/* Fase 3 */}
           <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm relative overflow-hidden group hover:border-red-300 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 font-bold text-6xl text-gray-300 group-hover:text-red-200">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Recebimento</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Evento Físico</p>
              <p className="text-sm text-gray-600">
                Digitalização da entrega. Ponto crítico de "Data Quality" devido à transcrição manual e latência.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-red-600 font-semibold">
                 Trava para pagamento.
              </div>
           </div>

           {/* Fase 4 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-300 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 font-bold text-6xl text-gray-300 group-hover:text-green-200">4</div>
              <h3 className="font-bold text-gray-900 mb-2">Pagamento</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Confirmação</p>
              <p className="text-sm text-gray-600">
                Retorno bancário. "Single Source of Truth" para auditoria financeira e indicadores de renda.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-green-600 font-semibold">
                 Fim do ciclo transacional.
              </div>
           </div>
        </div>
      </div>

      {/* Atores de Dados */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Atores do Ecossistema de Dados</h2>
        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">DEPAD</h4>
              <p className="text-xs text-gray-500 uppercase mb-2">Motor Operacional</p>
              <p className="text-sm text-gray-600">Gera dados transacionais (pedidos, metas). Cliente principal das regras de negócio.</p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">SAGICAD</h4>
              <p className="text-xs text-gray-500 uppercase mb-2">Refinaria de Dados</p>
              <p className="text-sm text-gray-600">Responsável por ETL, Data Warehouse, anonimização e publicação no VisData.</p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">Conab</h4>
              <p className="text-xs text-gray-500 uppercase mb-2">Parceiro Executor</p>
              <p className="text-sm text-gray-600">Gera dados descentralizados via PAA Net. Desafio de integração semântica.</p>
           </div>
        </div>
      </div>

    </div>
  );
};