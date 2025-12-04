import React from 'react';

export const Institutional: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-10">
      
      {/* Minimal Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-green-100 text-green-700 p-2 rounded-lg material-icons-round">account_balance</span>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            DEPAD
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-4xl">
          Departamento de Aquisição e Distribuição de Alimentos Saudáveis: O "motor" logístico e de dados do PAA.
        </p>
      </div>

      {/* Papel Institucional & Liderança */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-icons-round text-green-600">settings_applications</span>
            Papel Institucional
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            O DEPAD atua na estrutura da Secretaria Nacional de Segurança Alimentar e Nutricional (SESAN). Ele é responsável não apenas pela logística de alimentos, mas pela <strong>gestão de convênios</strong>, <strong>pactuação de metas</strong> com entes federados e pela definição das <strong>regras de negócio</strong> que alimentam sistemas como o SISPAA.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-icons-round text-blue-600">person</span>
            Liderança Técnica
          </h2>
          <div className="flex gap-4 items-start">
             <div className="flex-1">
                <p className="text-gray-600 leading-relaxed text-sm mb-2">
                  A continuidade administrativa é garantida por perfis técnicos como <strong>Paulo Sérgio Cândido Alves</strong>.
                </p>
                <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 text-xs text-blue-800">
                  <span className="font-semibold">Perfil:</span> Zootecnista (UFV) com atuação transversal em conselhos estratégicos (ANSN, CONAPE), garantindo a memória institucional e a estabilidade das regras de dados.
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Technical Data Structure Section - NEW */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="material-icons-round text-gray-700">schema</span>
              Estrutura de Dados Técnica
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Modelagem de entidades e atributos gerenciados pelo DEPAD no SISPAA e Data Warehouse.
            </p>
          </div>
          <span className="hidden md:inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-mono text-gray-600">
            Schema: OLTP &rarr; OLAP
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">Entidade de Dados</th>
                <th scope="col" className="px-6 py-3">Atributos Chave</th>
                <th scope="col" className="px-6 py-3">Fonte Primária</th>
                <th scope="col" className="px-6 py-3">Papel no Modelo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Termo de Adesão</td>
                <td className="px-6 py-4 font-mono text-xs">ID_Termo, NR_Edital, CD_IBGE, Status</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">SISPAA</span></td>
                <td className="px-6 py-4">Entidade Raiz (Parent). Define escopo territorial e legal.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Proposta</td>
                <td className="px-6 py-4 font-mono text-xs">ID_Proposta, Dt_Inicio, Dt_Fim, Meta_Fin</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">SISPAA</span> / Conab</td>
                <td className="px-6 py-4">Agregador de execução e planejamento tático.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Fornecedor</td>
                <td className="px-6 py-4 font-mono text-xs">NR_DAP/CAF, CPF, Sexo, Etnia</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">MDA (Integração)</span></td>
                <td className="px-6 py-4">Sujeito da política. Base para indicadores de inclusão (IN005, IN051).</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Produto</td>
                <td className="px-6 py-4 font-mono text-xs">CD_Produto, Descricao, Categoria</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Tabela Domínio</span></td>
                <td className="px-6 py-4">Padronização semântica (ex: Macaxeira = Mandioca).</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Recebimento</td>
                <td className="px-6 py-4 font-mono text-xs">ID_Recebimento, Dt_Entrega, Qtd_Real</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">SISPAA (Operacional)</span></td>
                <td className="px-6 py-4">Fato gerador financeiro. Prova de execução física.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Logic & Workflow */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-purple-600 mb-2 material-icons-round">rule</div>
          <h3 className="font-bold text-gray-900 mb-2">Regras de Validação</h3>
          <p className="text-sm text-gray-600">
            A "trava sistêmica" do Controle Social: O pagamento é bloqueado se não houver dados validados do Conselho (COMSEA) na tabela pai.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-purple-600 mb-2 material-icons-round">sync_alt</div>
          <h3 className="font-bold text-gray-900 mb-2">Interoperabilidade</h3>
          <p className="text-sm text-gray-600">
            Migração de troca de planilhas para APIs REST/JSON entre SISPAA (MDS) e PAA Net (Conab) para reduzir latência e erros.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-purple-600 mb-2 material-icons-round">analytics</div>
          <h3 className="font-bold text-gray-900 mb-2">Analytics (Teradata)</h3>
          <p className="text-sm text-gray-600">
            Processamento massivo para cruzar milhões de CPFs do PAA com o CadÚnico e gerar o indicador de focalização (IN023).
          </p>
        </div>
      </div>

    </div>
  );
};