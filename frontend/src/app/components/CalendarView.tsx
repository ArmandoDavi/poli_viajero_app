import { useState } from 'react';
import { Plus, X, ArrowLeft } from 'lucide-react';

interface Evento {
  id: number;
  titulo: string;
  fecha: string; // Formato YYYY-MM-DD
  tipo: string;
  detalle?: string;
}

interface CalendarViewProps {
  isDarkMode: boolean;
  eventos: Evento[];
  onAddEvento: (evento: Omit<Evento, 'id'>) => void;
  onBack: () => void; // <--- Nueva función para regresar
}

export function CalendarView({ isDarkMode, eventos, onAddEvento, onBack }: CalendarViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('info'); 

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevaFecha) return;
    
    onAddEvento({
      titulo: nuevoTitulo,
      fecha: nuevaFecha,
      tipo: nuevoTipo,
      detalle: 'Evento agendado desde tu calendario de movilidad.'
    });
    
    setNuevoTitulo('');
    setNuevaFecha('');
    setShowModal(false);
  };

  // Función para abrir el modal prellenando la fecha si haces clic en un día
  const handleDayClick = (dia: number) => {
    const fechaStr = `2026-06-${dia.toString().padStart(2, '0')}`;
    setNuevaFecha(fechaStr);
    setShowModal(true);
  };

  // Función para el botón global "+ Nuevo Evento" (sin fecha prellenada)
  const handleOpenEmptyModal = () => {
    setNuevaFecha('');
    setShowModal(true);
  };

  const dias = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Botón de Regresar */}
      <button 
        onClick={onBack}
        className={`flex items-center gap-2 mb-6 text-sm font-bold transition-colors ${
          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#750946]'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar al Inicio
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Junio 2026
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Mi Calendario de Movilidad
          </p>
        </div>
        <button 
          onClick={handleOpenEmptyModal}
          className="flex items-center gap-2 bg-[#750946] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#5a0735] transition-colors shadow-lg shadow-[#750946]/20"
        >
          <Plus className="w-5 h-5" />
          Nuevo Evento
        </button>
      </div>

      {/* Cuadrícula del Calendario */}
      <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-[#18020E]/40 border-white/10' : 'bg-white border-[#F0D0E0]'}`}>
        <div className={`grid grid-cols-7 border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-[#F0D0E0] bg-gray-50'}`}>
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(dia => (
            <div key={dia} className={`py-3 text-center text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {dia}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-5">
          <div className={`min-h-[120px] p-2 border-b border-r ${isDarkMode ? 'border-white/5' : 'border-[#F0D0E0]/50'}`}></div>
          
          {dias.map(dia => {
            const fechaStr = `2026-06-${dia.toString().padStart(2, '0')}`;
            const eventosDelDia = eventos.filter(e => e.fecha === fechaStr);

            return (
              <div 
                key={dia} 
                onClick={() => handleDayClick(dia)}
                className={`min-h-[120px] p-2 border-b border-r transition-colors cursor-pointer group ${
                  isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-[#F0D0E0]/50 hover:bg-[#FDE7F4]/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dia}</span>
                  {/* Pequeño icono de "+" que aparece al pasar el mouse */}
                  <Plus className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-400' : 'text-[#750946]'}`} />
                </div>
                <div className="mt-1 space-y-1">
                  {eventosDelDia.map(ev => (
                    <div key={ev.id} className={`text-[10px] px-2 py-1 rounded-md truncate font-semibold
                      ${ev.tipo === 'urgente' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 
                        ev.tipo === 'recordatorio' ? 'bg-[#750946]/10 text-[#750946] dark:bg-[#ED128E]/20 dark:text-[#ED128E]' : 
                        'bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}
                    >
                      {ev.titulo}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL NUEVO EVENTO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`relative w-full max-w-md border rounded-2xl p-6 shadow-2xl ${isDarkMode ? 'bg-[#18020E] border-[#750946]/30' : 'bg-white border-[#F0D0E0]'}`}>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#750946]">
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Agendar Trámite</h3>
            
            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400">Título del evento</label>
                <input type="text" required value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} placeholder="Ej. Vuelo a Madrid" className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:border-[#750946] ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400">Fecha</label>
                <input type="date" required value={nuevaFecha} onChange={e => setNuevaFecha(e.target.value)} className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:border-[#750946] ${isDarkMode ? 'bg-white/5 border-white/10 text-white [color-scheme:dark]' : 'bg-gray-50 border-gray-200 text-gray-800'}`} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400">Tipo de Alerta</label>
                <select value={nuevoTipo} onChange={e => setNuevoTipo(e.target.value)} className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:border-[#750946] ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                  <option value="info">Información</option>
                  <option value="recordatorio">Recordatorio</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#750946] text-white font-bold py-3 rounded-xl mt-2 hover:bg-[#5a0735] transition-colors shadow-md shadow-[#750946]/20">Guardar en Calendario</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}