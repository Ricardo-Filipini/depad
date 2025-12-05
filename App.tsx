import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MediaGallery } from './components/MediaGallery';
import { GeminiChat } from './components/GeminiChat';
import { NewsFeed } from './components/NewsFeed';
import { ImageStudio } from './components/ImageStudio';
import { Institutional } from './components/Institutional';
import { TechnicalData } from './components/TechnicalData';
import { BusinessRules } from './components/BusinessRules';
import { StrategicAnalysis } from './components/StrategicAnalysis';
import { Section } from './types';

function App() {
  const [section, setSection] = useState<Section>(Section.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderContent = () => {
    switch (section) {
      case Section.DASHBOARD:
        return <Dashboard />;
      case Section.INSTITUTIONAL:
        return <Institutional />;
      case Section.TECHNICAL_DATA:
        return <TechnicalData />;
      case Section.BUSINESS_RULES:
        return <BusinessRules />;
      case Section.STRATEGIC:
        return <StrategicAnalysis />;
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
        // Fallback for governance if needed, though mostly covered in TechnicalData/BusinessRules now.
        // Keeping it simplified or redirecting.
        return <TechnicalData />;
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
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
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