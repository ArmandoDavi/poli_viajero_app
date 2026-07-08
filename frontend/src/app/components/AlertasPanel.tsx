import { Calendar, FileText, AlertCircle, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Ahora recibimos los eventos desde afuera
interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  tipo: string;
  detalle?: string;
}

interface AlertasPanelProps {
  isDarkMode: boolean;
  eventos: Evento[];
  onViewCalendar: () => void; // <--- Función para abrir el calendario
}

export function AlertasPanel({ isDarkMode, eventos, onViewCalendar }: AlertasPanelProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Función para asignar colores e íconos según el tipo de evento
  const getEstiloEvento = (tipo: string) => {
    switch(tipo) {
      case 'urgente': 
        return { icono: AlertCircle, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
      case 'recordatorio': 
        return { icono: Clock, color: 'text-[#ED128E] bg-[#ED128E]/10 border-[#ED128E]/20' };
      default: 
        return { icono: Calendar, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' };
    }
  };

  // Función para darle formato bonito a la fecha
  const formatearFecha = (fechaStr: string) => {
    const [año, mes, dia] = fechaStr.split('-');
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${dia} de ${meses[parseInt(mes) - 1]}, ${año}`;
  };

  // MAGIA: Ordenamos los eventos por fecha (los más cercanos primero) y tomamos solo los próximos 4
  const proximosEventos = [...eventos]
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 4);

  return (
    <div className={`p-5 rounded-[2rem] border transition-all flex flex-col max-h-[calc(100vh-7rem)] ${
      isDarkMode 
        ? 'bg-[#18020E]/60 backdrop-blur-md border-[#2D0418]' 
        : 'bg-white border-[#F0D0E0] shadow-sm'
    }`}>
      {/* Cabecera Fija */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Próximos eventos
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </div>

      {/* Área con Scroll Interno */}
      <div className="space-y-3 overflow-y-auto pr-2 flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ED128E]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {proximosEventos.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4">No tienes eventos próximos.</p>
        ) : (
          proximosEventos.map((item) => {
            const isExpanded = expandedId === item.id;
            const estilo = getEstiloEvento(item.tipo);
            
            return (
              <div 
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer group select-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                    : 'bg-gray-50 border-gray-100 hover:bg-[#FDE7F4]/50 hover:border-[#F0D0E0]'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`p-2.5 rounded-xl border h-10 w-10 flex items-center justify-center flex-shrink-0 ${estilo.color}`}>
                    <estilo.icono className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-bold leading-tight group-hover:text-[#ED128E] transition-colors ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {item.titulo}
                      </h4>
                      <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#ED128E]' : 'text-gray-400 group-hover:text-[#ED128E]'
                      }`} />
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
                        {formatearFecha(item.fecha)}
                      </span>
                    </div>

                    <div className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden">
                        <p className={`text-xs leading-relaxed pt-2 border-t ${
                          isDarkMode ? 'text-gray-400 border-white/10' : 'text-gray-500 border-gray-200'
                        }`}>
                          {item.detalle || 'Evento agendado desde tu calendario de movilidad.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Botón Inferior Fijo - AHORA ABRE EL CALENDARIO */}
      <button 
        onClick={onViewCalendar}
        className={`w-full mt-4 py-3 flex-shrink-0 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
          isDarkMode 
            ? 'bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white' 
            : 'bg-[#FDF8FA] border-[#F0D0E0] text-[#750946] hover:bg-[#FDE7F4]'
        }`}
      >
        Abrir Calendario
      </button>
    </div>
  );
}