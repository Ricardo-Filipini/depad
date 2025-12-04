import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MediaGallery } from './components/MediaGallery';
import { GeminiChat } from './components/GeminiChat';
import { NewsFeed } from './components/NewsFeed';
import { ImageStudio } from './components/ImageStudio';
import { Institutional } from './components/Institutional';
import { Section } from './types';

function App() {
  const [section, setSection] = useState<Section>(Section.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (section) {
      case Section.DASHBOARD:
        return <Dashboard />;
      case Section.INSTITUTIONAL:
        return <Institutional />;
      case Section.MEDIA:
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Galeria Multimídia</h1>
            <MediaGallery folder="infografico" title="Infográficos" type="image" />
            <div className="border-t border-gray-100 my-8"></div>
            <MediaGallery folder="video" title="Vídeos" type="video" />
            <div className="border-t border-gray-100 my-8"></div>
            <MediaGallery folder="apresentacao" title="Apresentações e Materiais" type="pdf" displayMode="list" />
          </div>
        );
      case Section.LEGISLATION:
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Legislação e Normativas</h1>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Acesso direto aos documentos legais que fundamentam o Programa de Aquisição de Alimentos, incluindo Leis, Decretos, Portarias e Resoluções do Grupo Gestor.
            </p>
            <MediaGallery folder="lei" title="Documentos Legais" type="pdf" displayMode="list" />
          </div>
        );
      case Section.GOVERNANCE:
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
             <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Governança de Dados do PAA</h1>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4 text-lg">
                    O Programa de Aquisição de Alimentos (PAA) utiliza uma infraestrutura de dados robusta baseada em Teradata para cruzar informações do SISPAA (MDS) e PAA Net (Conab) com o Cadastro Único.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 my-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="material-icons-round text-blue-600">integration_instructions</span>
                        Modelo Lógico
                      </h3>
                      <p>
                        A "pedra de roseta" para a estruturação dos dados. Define a cadeia causal da política (Insumos > Atividades > Produtos > Resultados) e padroniza a semântica, como a definição exata de "Agricultor Familiar".
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="material-icons-round text-purple-600">security</span>
                        Segurança e Privacidade
                      </h3>
                      <p>
                        Uso rigoroso da LGPD. Dados nominais são anonimizados antes da publicação no VisData. O acesso a dados sensíveis no Data Warehouse é restrito a perfis técnicos específicos.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Fluxo de Informação</h3>
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 relative">
                        <div className="absolute top-4 right-4 text-blue-200 font-bold text-4xl">1</div>
                        <div className="font-bold text-blue-800 mb-1">Entrada</div>
                        <p className="text-sm">Termo de Adesão, Proposta de Participação, Validação CAF/DAP.</p>
                    </div>
                    <div className="hidden md:flex items-center text-gray-300"><span className="material-icons-round">arrow_forward</span></div>
                    <div className="flex-1 bg-yellow-50 p-4 rounded-xl border border-yellow-100 relative">
                        <div className="absolute top-4 right-4 text-yellow-200 font-bold text-4xl">2</div>
                        <div className="font-bold text-yellow-800 mb-1">Processamento</div>
                        <p className="text-sm">ETL (Extract, Transform, Load), Saneamento, Cruzamento com CadÚnico, Validação de Regras.</p>
                    </div>
                    <div className="hidden md:flex items-center text-gray-300"><span className="material-icons-round">arrow_forward</span></div>
                    <div className="flex-1 bg-green-50 p-4 rounded-xl border border-green-100 relative">
                        <div className="absolute top-4 right-4 text-green-200 font-bold text-4xl">3</div>
                        <div className="font-bold text-green-800 mb-1">Saída</div>
                        <p className="text-sm">Pagamentos, Indicadores (VisData), Transparência Ativa.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      case Section.CHAT:
        return (
          <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in h-full">
            <GeminiChat />
          </div>
        );
      case Section.NEWS:
        return (
          <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
            <NewsFeed />
          </div>
        );
      case Section.STUDIO:
        return (
          <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Estúdio Criativo PAA</h1>
            <p className="text-gray-500 mb-8">Crie materiais visuais para campanhas ou edite fotos de produtos usando IA.</p>
            <ImageStudio />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar 
        activeSection={section} 
        setSection={setSection} 
        isOpen={sidebarOpen} 
        toggle={toggleSidebar} 
      />
      
      <main className="flex-1 min-w-0 transition-all duration-300 h-screen overflow-y-auto">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="font-bold text-lg text-green-700 flex items-center gap-2">
             <span className="material-icons-round">agriculture</span> PAA Data
          </div>
          <button onClick={toggleSidebar} className="text-gray-600">
            <span className="material-icons-round text-2xl">menu</span>
          </button>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;