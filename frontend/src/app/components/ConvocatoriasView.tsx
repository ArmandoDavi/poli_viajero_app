import { ExternalLink, Calendar, ExternalLink as ExternalLinkIcon, Download, Eye, GraduationCap, Languages, CheckCircle2, X, Globe, MapPin } from 'lucide-react';
import { useState } from 'react';

interface ConvocatoriasViewProps {
  isDarkMode: boolean;
}

const convocatorias = [
  { 
    id: 1, 
    title: 'Movilidad Académica Internacional 2026-2', 
    type: 'Semestre Académico', 
    deadline: '15 de Octubre, 2026', 
    status: 'Cierra pronto',
    tags: ['Europa', 'Asia', 'América'],
    minPromedio: '8.5',
    language: 'B2 (Inglés u otro)',
    requirements: [
      'Estar inscrito entre el 5to y 7mo semestre en ESCOM.',
      'No tener unidades de aprendizaje reprobadas o desfasadas.',
      'Pasaporte vigente por al menos 6 meses posteriores al término.',
      'Carta de postulación firmada por Gestión Escolar.',
      'Certificado de idioma con vigencia no mayor a 2 años.'
    ]
  },
  { 
    id: 2, 
    title: 'Programa PILA (América Latina)', 
    type: 'Intercambio', 
    deadline: '30 de Septiembre, 2026', 
    status: 'Abierta',
    tags: ['Colombia', 'Argentina', 'Chile'],
    minPromedio: '8.0',
    language: 'Nativo (Español)',
    requirements: [
      'Ser alumno regular del IPN.',
      'Haber cursado al menos el 50% de los créditos del programa.',
      'Curriculum Vitae actualizado sin engargolar.',
      'Carta de exposición de motivos dirigida a la DRI.'
    ]
  },
  { 
    id: 3, 
    title: 'Beca de Excelencia Eiffel', 
    type: 'Posgrado / Especialidad', 
    deadline: '10 de Noviembre, 2026', 
    status: 'Próxima',
    tags: ['Francia'],
    minPromedio: '9.0',
    language: 'B2 (Francés)',
    requirements: [
      'Tener excelencia académica demostrable.',
      'No haber sido rechazado previamente en este programa.',
      'Proyecto de estudios bien definido y alineado con la institución destino.',
      'Certificación DELF/DALF B2 o superior.'
    ]
  },
];

export function ConvocatoriasView({ isDarkMode }: ConvocatoriasViewProps) {
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<typeof convocatorias[0] | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300 font-sans">
      
      {/* Banner de la DRI - COLOR CORREGIDO: Guinda (#750946) */}
      <div className={`relative overflow-hidden rounded-2xl p-8 mb-8 border shadow-lg ${
        isDarkMode ? 'bg-[#750946] border-[#750946]/50' : 'bg-[#750946] border-[#750946]'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Dirección de Relaciones Internacionales</h2>
            <p className="opacity-90 max-w-xl text-sm md:text-base">
              Consulta formatos institucionales, homologación de materias y el listado oficial de universidades destino en el portal del Instituto.
            </p>
          </div>
          <a 
            href="https://www.ipn.mx/dri/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 whitespace-nowrap shadow-lg ${
              isDarkMode ? 'bg-[#2D0418] text-white hover:bg-[#18020E]' : 'bg-white text-[#750946] hover:bg-gray-100'
            }`}
          >
            Ir al portal oficial
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </div>
        <Globe className="absolute -right-10 -top-10 w-64 h-64 text-white opacity-10 pointer-events-none" />
      </div>

      <div className="flex justify-between items-end mb-6">
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
          Convocatorias Activas
        </h3>
      </div>

      {/* Grid de Tarjetas de Convocatoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {convocatorias.map((conv) => (
          <div key={conv.id} className={`flex flex-col p-6 rounded-2xl border transition-all hover:shadow-lg ${
            isDarkMode ? 'bg-[#18020E] border-[#2D0418] hover:border-[#750946]/50' : 'bg-white border-[#F0D0E0] hover:border-[#750946]/50'
          }`}>
            
            {/* Header de la tarjeta */}
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                conv.status === 'Cierra pronto' ? 'bg-red-500/10 text-red-500' :
                conv.status === 'Abierta' ? 'bg-green-500/10 text-green-500' :
                isDarkMode ? 'bg-[#2D0418] text-[#A0A0A0]' : 'bg-gray-100 text-gray-500'
              }`}>
                {conv.status}
              </span>
              <div className="flex gap-1">
                {conv.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 rounded-md text-xs font-medium ${isDarkMode ? 'bg-[#2D0418] text-[#A0A0A0]' : 'bg-gray-100 text-gray-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h4 className={`text-xl font-bold mb-3 line-clamp-2 min-h-[3.5rem] ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              {conv.title}
            </h4>

            {/* Info Rápida */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#2D0418]' : 'bg-gray-50'}`}><GraduationCap className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}/></div>
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>Promedio</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Mínimo {conv.minPromedio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#2D0418]' : 'bg-gray-100'}`}><Languages className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}/></div>
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>Idioma</p>
                  <p className={`text-sm font-semibold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{conv.language}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto border-t pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                <Calendar className="w-4 h-4" /> 
                <span>Cierre: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{conv.deadline}</strong></span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                {/* Botón Ver Detalle - COLOR CORREGIDO: Outline (#750946) */}
                <button 
                  onClick={() => setSelectedConvocatoria(conv)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                    isDarkMode 
                      ? 'bg-[#2D0418] border-[#750946]/50 text-white hover:bg-[#750946]' 
                      : 'bg-[#FDE7F4] border-[#750946]/50 text-[#750946] hover:bg-[#FCD2E9]'
                  }`}
                >
                  <Eye className="w-4 h-4" /> Detalles
                </button>
                {/* Botón PDF - COLOR CORREGIDO: Gris sutil (#ED128E desactivado) */}
                <button 
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-[#2D0418] text-[#E5E5E5] hover:bg-[#3d0621]' 
                      : 'bg-gray-100 text-[#333333] hover:bg-gray-200'
                  }`}
                >
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL DE REQUISITOS --- */}
      {selectedConvocatoria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 custom-modal-overlay">
          <div className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh] custom-modal-container ${
            isDarkMode ? 'bg-[#18020E] border border-[#2D0418]' : 'bg-white border border-gray-200'
          }`}>
            
            <button 
              onClick={() => setSelectedConvocatoria(null)}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDarkMode ? 'text-[#A0A0A0] hover:text-white hover:bg-[#2D0418]' : 'text-gray-500 hover:text-black hover:bg-gray-100'
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6 pr-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                isDarkMode ? 'bg-[#2D0418] text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {selectedConvocatoria.type}
              </span>
              <h3 className={`text-2xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                {selectedConvocatoria.title}
              </h3>
            </div>

            <div className="overflow-y-auto pr-2 custom-scrollbar">
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                Requisitos Institucionales
              </h4>
              
              <ul className="space-y-4 mb-6">
                {selectedConvocatoria.requirements.map((req, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-[#ED128E]' : 'text-[#750946]'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-[#E5E5E5]' : 'text-gray-700'}`}>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
                <MapPin className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  Recuerda que la entrega de expedientes físicos se realiza en el edificio de Gestión Escolar. Revisa bien las fechas límite.
                </p>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex justify-end gap-3 ${isDarkMode ? 'border-[#2D0418]' : 'border-gray-200'}`}>
              <button 
                onClick={() => setSelectedConvocatoria(null)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isDarkMode ? 'hover:bg-[#2D0418] text-[#A0A0A0]' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                Cerrar
              </button>
              {/* Botón Modal PDF - COLOR CORREGIDO: Outline guinda (#ED128E desactivado) */}
              <button className={`flex items-center gap-2 border px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-[#2D0418] border-[#750946]/50 text-white hover:bg-[#750946]' 
                    : 'bg-[#FDE7F4] border-[#750946]/50 text-[#750946] hover:bg-[#FCD2E9]'
              }`}>
                <Download className="w-4 h-4" /> Descargar Bases Oficiales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}