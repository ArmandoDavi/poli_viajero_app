import { Shield, Flame, Cross } from 'lucide-react';
import { useState } from 'react';

interface EmergencyViewProps {
  isDarkMode: boolean;
}

const emergencyData = [
  // --- AMÉRICA ---
  { country: 'Argentina', code: 'ar', continent: 'América', police: '911', ambulance: '107', fire: '100' },
  { country: 'Bolivia', code: 'bo', continent: 'América', police: '110', ambulance: '118', fire: '119' },
  { country: 'Brasil', code: 'br', continent: 'América', police: '190', ambulance: '192', fire: '193' },
  { country: 'Canadá', code: 'ca', continent: 'América', police: '911', ambulance: '911', fire: '911' },
  { country: 'Chile', code: 'cl', continent: 'América', police: '133', ambulance: '131', fire: '132' },
  { country: 'Colombia', code: 'co', continent: 'América', police: '123', ambulance: '123', fire: '119' },
  { country: 'Costa Rica', code: 'cr', continent: 'América', police: '911', ambulance: '911', fire: '911' },
  { country: 'Cuba', code: 'cu', continent: 'América', police: '106', ambulance: '104', fire: '105' },
  { country: 'El Salvador', code: 'sv', continent: 'América', police: '911', ambulance: '132', fire: '913' },
  { country: 'Estados Unidos', code: 'us', continent: 'América', police: '911', ambulance: '911', fire: '911' },
  { country: 'Panamá', code: 'pa', continent: 'América', police: '104', ambulance: '911', fire: '103' },
  { country: 'Perú', code: 'pe', continent: 'América', police: '105', ambulance: '106', fire: '116' },
  { country: 'República Dominicana', code: 'do', continent: 'América', police: '911', ambulance: '911', fire: '911' },
  { country: 'Venezuela', code: 've', continent: 'América', police: '911', ambulance: '911', fire: '911' },

  // --- EUROPA ---
  { country: 'Alemania', code: 'de', continent: 'Europa', police: '110', ambulance: '112', fire: '112' },
  { country: 'Bélgica', code: 'be', continent: 'Europa', police: '101', ambulance: '112', fire: '112' },
  { country: 'España', code: 'es', continent: 'Europa', police: '112', ambulance: '112', fire: '112' },
  { country: 'Francia', code: 'fr', continent: 'Europa', police: '17', ambulance: '15', fire: '18' },
  { country: 'Italia', code: 'it', continent: 'Europa', police: '112', ambulance: '112', fire: '112' },
  { country: 'Noruega', code: 'no', continent: 'Europa', police: '112', ambulance: '113', fire: '110' },
  { country: 'Polonia', code: 'pl', continent: 'Europa', police: '997', ambulance: '999', fire: '998' },
  { country: 'Portugal', code: 'pt', continent: 'Europa', police: '112', ambulance: '112', fire: '112' },
  { country: 'Reino Unido', code: 'gb', continent: 'Europa', police: '999', ambulance: '999', fire: '999' },
  { country: 'República Checa', code: 'cz', continent: 'Europa', police: '158', ambulance: '155', fire: '150' },
  { country: 'Suecia', code: 'se', continent: 'Europa', police: '112', ambulance: '112', fire: '112' },

  // --- ASIA ---
  { country: 'China', code: 'cn', continent: 'Asia', police: '110', ambulance: '120', fire: '119' },
  { country: 'Corea del Sur', code: 'kr', continent: 'Asia', police: '112', ambulance: '119', fire: '119' },
  { country: 'India', code: 'in', continent: 'Asia', police: '112', ambulance: '112', fire: '112' },
  { country: 'Japón', code: 'jp', continent: 'Asia', police: '110', ambulance: '119', fire: '119' },
  { country: 'Vietnam', code: 'vn', continent: 'Asia', police: '113', ambulance: '115', fire: '114' },

  // --- ÁFRICA ---
  { country: 'Angola', code: 'ao', continent: 'África', police: '113', ambulance: '112', fire: '115' },
];

const continents = ['Todos', 'América', 'Europa', 'Asia', 'África'];

export function EmergencyView({ isDarkMode }: EmergencyViewProps) {
  const [activeContinent, setActiveContinent] = useState('Todos');

  const filteredCountries = activeContinent === 'Todos'
    ? emergencyData
    : emergencyData.filter(item => item.continent === activeContinent);

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
          Directorio de Emergencias Internacionales
        </h1>
        <p className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}>
          Números de asistencia inmediata para la comunidad politécnica en el extranjero.
        </p>
      </div>

      <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl mb-8 border ${
        isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-gray-100 border-gray-200'
      }`}>
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => setActiveContinent(continent)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeContinent === continent
                // --- AQUÍ ESTÁ EL CAMBIO: bg-[#750946] en lugar de bg-[#ED128E] ---
                ? 'bg-[#750946] text-white shadow-md'
                : isDarkMode
                  ? 'text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#E5E5E5]'
                  : 'text-[#666666] hover:bg-white hover:text-[#750946]'
            }`}
          >
            {continent}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((data) => (
          <div key={data.country} className={`rounded-2xl p-6 border transition-all hover:scale-[1.01] ${
            isDarkMode ? 'bg-[#18020E] border-[#2D0418] hover:border-[#750946]/40' : 'bg-white border-[#F0D0E0] hover:shadow-md'
          }`}>
            <div className="flex items-center gap-4 mb-5 pb-3 border-b border-opacity-30 border-gray-500">
              <img 
                src={`https://flagcdn.com/w80/${data.code}.png`} 
                alt={`Bandera de ${data.country}`}
                className="w-10 object-contain rounded-sm shadow-sm"
              />
              <div className="flex flex-col">
                <h2 className={`text-lg font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                  {data.country}
                </h2>
                <span className={`text-xs ${isDarkMode ? 'text-[#707070]' : 'text-[#A0A0A0]'}`}>
                  {data.continent}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl"><Shield className="w-4 h-4 text-blue-500" /></div>
                  <span className={`text-sm ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>Policía</span>
                </div>
                <span className="font-bold text-base text-blue-400">{data.police}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-xl"><Cross className="w-4 h-4 text-green-500" /></div>
                  <span className={`text-sm ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>Ambulancia</span>
                </div>
                <span className="font-bold text-base text-green-400">{data.ambulance}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg"><Flame className="w-4 h-4 text-red-500" /></div>
                  <span className={`text-sm ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>Bomberos</span>
                </div>
                <span className="font-bold text-base text-red-400">{data.fire}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}