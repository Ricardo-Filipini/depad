import React from 'react';
import { PAA_CONTENT } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Ecossistema de Dados do PAA 🌽
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Uma visão integrada da transformação digital do Programa de Aquisição de Alimentos: 
          Governança, Legislação e Inteligência Analítica.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
            <span className="material-icons-round">groups</span>
          </div>
          <h3 className="font-bold text-gray-800 text-2xl">95M+</h3>
          <p className="text-sm text-gray-500">Pessoas no CadÚnico</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <span className="material-icons-round">storage</span>
          </div>
          <h3 className="font-bold text-gray-800 text-2xl">Teradata</h3>
          <p className="text-sm text-gray-500">Data Warehouse</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
            <span className="material-icons-round">api</span>
          </div>
          <h3 className="font-bold text-gray-800 text-2xl">APIs</h3>
          <p className="text-sm text-gray-500">Interoperabilidade MDS/Conab</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
            <span className="material-icons-round">visibility</span>
          </div>
          <h3 className="font-bold text-gray-800 text-2xl">VisData</h3>
          <p className="text-sm text-gray-500">Transparência Ativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {PAA_CONTENT.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-green-200 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors text-gray-600 group-hover:text-green-600">
                <span className="material-icons-round text-2xl">{section.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="material-icons-round text-green-500 text-sm mt-0.5">check_circle</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};