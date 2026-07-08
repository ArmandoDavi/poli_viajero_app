import { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

// 1. Agregamos las propiedades de búsqueda a la interfaz
interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

// 2. Recibimos esas propiedades en el componente
export function Navbar({ isDarkMode, toggleDarkMode, searchQuery, setSearchQuery }: NavbarProps) {
  // --- 1. ESTADO PARA GUARDAR LOS DATOS DEL USUARIO ---
  const [navUser, setNavUser] = useState({
    nombre: 'Usuario',
    foto: null as string | null
  });

  // --- 2. EFECTO PARA TRAER LOS DATOS DE PYTHON ---
  useEffect(() => {
    const boletaUsuario = localStorage.getItem("boleta");
    if (boletaUsuario) {
      fetch(`http://localhost:8000/api/usuarios/${boletaUsuario}`)
        .then(res => res.json())
        .then(data => {
          if (!data.detail) {
            setNavUser({
              // Tomamos solo el primer nombre
              nombre: data.nombre.split(' ')[0], 
              // Le agregamos el rompe-caché para la foto
              foto: data.foto_perfil ? `${data.foto_perfil}?t=${Date.now()}` : null
            });
          }
        })
        .catch(err => console.error("Error al cargar datos del navbar:", err));
    }
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 z-50 ${
      isDarkMode
        ? 'bg-[#18020E] border-b border-[#2D0418]'
        : 'bg-white border-b border-[#E8E8E8]'
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* --- AQUÍ SE AGREGÓ TU LOGO --- */}
          <img 
            src="./././images/logo_original-removebg-preview.png" 
            alt="Logo Poli Viajero" 
            className="w-10 h-10 object-contain" 
          />
          <span
            className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Poli viajero
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'
            }`} />
            
            {/* 3. CONECTAMOS EL INPUT CON EL ESTADO */}
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-all ${
                isDarkMode
                  ? 'bg-[#2D0418] text-[#E5E5E5] placeholder-[#A0A0A0] focus:ring-[#750946] border border-[#3D0522]'
                  : 'bg-[#FDE7F4] text-[#333333] placeholder-[#999999] focus:ring-[#750946] focus:bg-white border border-[#F0C8DF]'
              }`}
            />
            
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-[#E5E5E5]" />
            ) : (
              <Moon className="w-6 h-6 text-[#333333]" />
            )}
          </button>
          <button className={`relative p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
          }`}>
            <Bell className={`w-6 h-6 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`} />
            <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-[#ED128E]' : 'bg-[#750946]'
            }`}></span>
          </button>
          
          {/* BOTÓN DE PERFIL DINÁMICO */}
          <button className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 flex-shrink-0 ${
            isDarkMode ? 'border-[#750946] bg-[#18020E]' : 'border-[#750946] bg-gray-100'
          }`}>
            {navUser.foto ? (
              <img
                src={navUser.foto}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                {navUser.nombre.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
}