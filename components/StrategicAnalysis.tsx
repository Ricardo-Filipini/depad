import React from 'react';

export const StrategicAnalysis: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-10">
      
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Análise Estratégica
        </h1>
        <p className="text-gray-600 text-lg max-w-4xl">
          O valor oculto dos dados do PAA: Como a infraestrutura digital habilita a otimização de políticas públicas e o alcance de metas globais.
        </p>
      </div>

      {/* Revelações */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl mb-4 block">🚜</span>
            <h3 className="font-bold text-gray-900 mb-2">DNA de Big Tech</h3>
            <p className="text-sm text-gray-600">
               O PAA opera com a mesma arquitetura de dados de gigantes do varejo (Teradata/MPP), permitindo cruzar bilhões de registros para auditar a eficiência social.
            </p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl mb-4 block">🗣️</span>
            <h3 className="font-bold text-gray-900 mb-2">Macaxeira ou Aipim?</h3>
            <p className="text-sm text-gray-600">
               O desafio semântico da taxonomia. A padronização via APIs resolve a "Torre de Babel" regional, permitindo uma visão nacional unificada da produção.
            </p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl mb-4 block">⚓</span>
            <h3 className="font-bold text-gray-900 mb-2">Âncoras de Conhecimento</h3>
            <p className="text-sm text-gray-600">
               A estabilidade da política depende de perfis técnicos (como Paulo Sérgio Alves) que mantêm a memória institucional dos sistemas através de ciclos políticos.
            </p>
         </div>
      </div>

      {/* Aplicações Estratégicas */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
         <h2 className="text-2xl font-bold text-gray-900 mb-8">Níveis de Maturidade Analítica</h2>
         
         <div className="space-y-6">
            <div className="flex gap-4 items-start">
               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
               <div>
                  <h3 className="font-bold text-gray-900 text-lg">Descritiva (Eficiência)</h3>
                  <p className="text-gray-600 text-sm mb-2">"O que está acontecendo?"</p>
                  <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-500">
                     Uso de indicadores financeiros (IN108/IN111) para identificar gargalos de pagamento e execução orçamentária.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">2</div>
               <div>
                  <h3 className="font-bold text-gray-900 text-lg">Diagnóstica (Equidade)</h3>
                  <p className="text-gray-600 text-sm mb-2">"Por que está acontecendo?"</p>
                  <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-500">
                     Cruzamento com CadÚnico para verificar se a política atinge os mais pobres (IN023) e se empodera mulheres (IN005).
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">3</div>
               <div>
                  <h3 className="font-bold text-gray-900 text-lg">Preditiva (Futuro)</h3>
                  <p className="text-gray-600 text-sm mb-2">"O que vai acontecer?"</p>
                  <p className="text-sm bg-white p-3 rounded border border-gray-200 text-gray-500">
                     Potencial para cruzar dados de execução com dados climáticos para prever quebras de safra e ajustar editais proativamente.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Mandala ODS */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
               <h2 className="text-2xl font-bold mb-4">Da Horta à ONU</h2>
               <p className="text-blue-100 mb-6 leading-relaxed">
                  Os dados do PAA alimentam diretamente a "Mandala dos ODS". Cada real pago a uma agricultora não é apenas uma despesa, é uma evidência auditável de cumprimento de metas globais.
               </p>
               <div className="flex gap-3">
                  <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded text-xs">ODS 2: Fome Zero</span>
                  <span className="px-3 py-1 bg-red-500 text-white font-bold rounded text-xs">ODS 5: Igualdade de Gênero</span>
               </div>
            </div>
            <div className="w-full md:w-1/3 bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
               <div className="text-xs uppercase text-blue-300 font-bold mb-2">Indicador Chave</div>
               <div className="text-3xl font-bold mb-1">IN005 / IN006</div>
               <p className="text-sm text-blue-100">Participação Feminina</p>
               <div className="mt-4 h-2 bg-blue-900 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-pink-500"></div>
               </div>
               <div className="mt-1 text-xs text-right text-blue-300">Meta: &gt;50%</div>
            </div>
         </div>
      </div>

    </div>
  );
};