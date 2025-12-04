import React from 'react';

export const Institutional: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Departamento de Aquisição e Distribuição de Alimentos Saudáveis (DEPAD)
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl leading-relaxed">
            O coração operacional do Programa de Aquisição de Alimentos (PAA), transformando segurança alimentar em dados e cidadania.
          </p>
        </div>
      </div>

      {/* Papel Institucional */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
            <span className="material-icons-round text-2xl">account_balance</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Papel Institucional</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            O DEPAD atua como o "motor" logístico e administrativo da Secretaria Nacional de Segurança Alimentar e Nutricional (SESAN). Ele não apenas movimenta alimentos, mas orquestra uma complexa rede de informações que conecta a produção rural à vulnerabilidade social.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="material-icons-round text-green-500 mt-1">check_circle</span>
              <span className="text-gray-700">Gestão de convênios e pactuação de metas com estados e municípios.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-icons-round text-green-500 mt-1">check_circle</span>
              <span className="text-gray-700">Definição de regras de negócio para sistemas como o SISPAA.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-icons-round text-green-500 mt-1">check_circle</span>
              <span className="text-gray-700">Monitoramento da execução orçamentária e física.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <span className="material-icons-round text-2xl">psychology</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Liderança Técnica & Continuidade</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A estabilidade de políticas complexas como o PAA depende de perfis técnicos altamente especializados. A figura de <strong className="text-gray-900">Paulo Sérgio Cândido Alves</strong> exemplifica a importância da "memória institucional".
          </p>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Perfil Técnico</h4>
            <p className="text-sm text-blue-800">
              Zootecnista formado pela UFV, atua como uma "âncora de conhecimento" no DEPAD, garantindo que a tecnologia e os dados sirvam à realidade do campo, especialmente em momentos críticos como foi a pandemia de COVID-19.
            </p>
          </div>
        </div>
      </div>

      {/* Estrutura de Dados */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Estrutura Técnica de Dados</h2>
            <p className="text-gray-400">Do analógico ao "Gêmeo Digital" da política pública.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm font-mono text-green-400 border border-gray-700">Teradata</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm font-mono text-blue-400 border border-gray-700">Python</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm font-mono text-purple-400 border border-gray-700">APIs</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="font-bold text-lg mb-2">1. Adesão</h3>
            <p className="text-gray-400 text-sm">Gênese do dado. Instrumento jurídico que cria a "Tabela Pai" no sistema.</p>
          </div>
          <div className="hidden md:flex items-center justify-center text-gray-600">
            <span className="material-icons-round text-3xl">arrow_forward</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
            <div className="text-4xl mb-4">🚜</div>
            <h3 className="font-bold text-lg mb-2">2. Proposta</h3>
            <p className="text-gray-400 text-sm">Planejamento. Validação de CPF/DAP e definição de produtos.</p>
          </div>
          <div className="hidden md:flex items-center justify-center text-gray-600">
            <span className="material-icons-round text-3xl">arrow_forward</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-bold text-lg mb-2">3. Recebimento</h3>
            <p className="text-gray-400 text-sm">O evento físico vira digital. Ponto crítico de controle de qualidade.</p>
          </div>
          <div className="hidden md:flex items-center justify-center text-gray-600">
            <span className="material-icons-round text-3xl">arrow_forward</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">4. Pagamento</h3>
            <p className="text-gray-400 text-sm">Confirmação financeira. A "verdade única" para auditoria.</p>
          </div>
        </div>

        <div className="mt-10 p-6 bg-gray-800 rounded-2xl border border-gray-700">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-icons-round text-yellow-500">warning</span>
            Desafio de Interoperabilidade: MDS vs Conab
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Um dos maiores desafios técnicos é a coexistência de dois sistemas: o <strong>SISPAA</strong> (MDS) e o <strong>PAA Net</strong> (Conab). Historicamente operando em silos, a modernização busca a integração via <strong>APIs</strong> para substituir a troca manual de planilhas, garantindo uma visão nacional unificada e em tempo real.
          </p>
          <div className="flex gap-2">
             <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">Silos de Dados</span>
             <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">Latência</span>
             <span className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">Padronização Semântica</span>
          </div>
        </div>
      </div>

    </div>
  );
};