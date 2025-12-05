import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  setSection: (s: Section) => void;
  isOpen: boolean;
  toggle: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
}

const navItems = [
  { id: Section.DASHBOARD, label: 'Visão Geral', icon: 'dashboard' },
  { id: Section.TECHNICAL_DATA, label: 'Dados Técnicos', icon: 'dns' },
  { id: Section.BUSINESS_RULES, label: 'Regras de Negócio', icon: 'rule' },
  { id: Section.STRATEGIC, label: 'Estratégia', icon: 'lightbulb' },
  { id: Section.INSTITUTIONAL, label: 'Institucional', icon: 'account_balance' },
  // { id: Section.GOVERNANCE, label: 'Governança', icon: 'schema' }, // Subsumido em Dados Técnicos e Regras
  { id: Section.LEGISLATION, label: 'Legislação', icon: 'gavel' },
  { id: Section.MEDIA, label: 'Galeria', icon: 'perm_media' },
  { id: Section.NEWS, label: 'Notícias', icon: 'newspaper' },
  { id: Section.STUDIO, label: 'Estúdio IA', icon: 'palette' },
  { id: Section.CHAT, label: 'Assistente', icon: 'smart_toy' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setSection, 
  isOpen, 
  toggle, 
  collapsed, 
  toggleCollapse 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      />
      
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'md:w-20' : 'md:w-64'} w-64
      `}>
        <div className={`p-4 border-b border-gray-100 flex items-center h-20 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <div className="flex items-center gap-2 font-bold text-lg text-green-700 overflow-hidden whitespace-nowrap">
              <span className="material-icons-round text-2xl">agriculture</span>
              <span>PAA<span className="text-gray-500 font-light text-sm ml-1">Data</span></span>
            </div>
          ) : (
            <span className="material-icons-round text-3xl text-green-700">agriculture</span>
          )}
          
          <button onClick={toggle} className="md:hidden text-gray-500 hover:text-gray-900">
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <nav className="p-2 space-y-1 overflow-y-auto flex-1 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSection(item.id);
                if (window.innerWidth < 768) toggle();
              }}
              title={collapsed ? item.label : ''}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                activeSection === item.id
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <span className={`material-icons-round text-2xl transition-colors ${activeSection === item.id ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </span>
              
              {!collapsed && (
                <span className="text-sm truncate">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer / Toggle Collapse */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 font-bold shadow-sm shrink-0">
                  <span className="material-icons-round text-base">bolt</span>
                </div>
                <div className="truncate">
                  <p className="font-semibold text-gray-700">Gemini Flash</p>
                  <p className="text-[10px] text-gray-400">IA Ativada</p>
                </div>
              </div>
              <button 
                onClick={toggleCollapse}
                className="hidden md:flex p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors"
              >
                <span className="material-icons-round text-sm">first_page</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                <span className="material-icons-round text-base">bolt</span>
              </div>
              <button 
                onClick={toggleCollapse}
                className="hidden md:flex p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors"
              >
                <span className="material-icons-round text-sm">last_page</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};