import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  setSection: (s: Section) => void;
  isOpen: boolean;
  toggle: () => void;
}

const navItems = [
  { id: Section.DASHBOARD, label: 'Visão Geral', icon: 'dashboard' },
  { id: Section.INSTITUTIONAL, label: 'Institucional', icon: 'account_balance' },
  { id: Section.GOVERNANCE, label: 'Governança', icon: 'schema' },
  { id: Section.LEGISLATION, label: 'Legislação', icon: 'gavel' },
  { id: Section.MEDIA, label: 'Galeria', icon: 'perm_media' },
  { id: Section.NEWS, label: 'Notícias', icon: 'newspaper' },
  { id: Section.CHAT, label: 'Assistente', icon: 'smart_toy' },
  { id: Section.STUDIO, label: 'Estúdio', icon: 'palette' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setSection, isOpen, toggle }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      />
      
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between h-20">
          <div className="flex items-center gap-2 font-bold text-lg text-green-700">
            <span className="material-icons-round text-2xl">agriculture</span>
            <span>PAA<span className="text-gray-500 font-light text-sm ml-1">Data</span></span>
          </div>
          <button onClick={toggle} className="md:hidden text-gray-500 hover:text-gray-900">
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSection(item.id);
                if (window.innerWidth < 768) toggle();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                activeSection === item.id
                  ? 'bg-green-50 text-green-700 font-semibold border border-green-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`material-icons-round text-xl ${activeSection === item.id ? 'text-green-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 font-bold shadow-sm">
              <span className="material-icons-round text-base">bolt</span>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Gemini Flash</p>
              <p className="text-[10px] text-gray-400">IA Ativada</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};