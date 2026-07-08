import { useState, useEffect } from 'react';
import { Home, ShoppingBag, MessageCircle, User, PhoneCall, FileText, LogOut, Utensils } from 'lucide-react'; // <-- Agregamos Utensils

interface SidebarProps {
  isDarkMode: boolean;
  activePage?: string;
  onPageChange?: (page: string) => void;
}

// --- AGREGAMOS RESTAURANTES A LA LISTA ---
const menuItems = [
  { icon: Home, label: 'Inicio', page: 'inicio' },
  { icon: ShoppingBag, label: 'Mercado', page: 'mercado' },
  { icon: MessageCircle, label: 'Mensajes', page: 'mensajes' },
  { icon: User, label: 'Perfil', page: 'perfil' },
  { icon: PhoneCall, label: 'Emergencias', page: 'emergencias' },
  { icon: FileText, label: 'Convocatorias', page: 'convocatorias' },
  { icon: Utensils, label: 'Restaurantes', page: 'restaurantes' }, // <-- Nueva sección
];

export function Sidebar({ isDarkMode, activePage = 'inicio', onPageChange }: SidebarProps) {
  // --- 1. ESTADO PARA GUARDAR LOS DATOS DEL USUARIO ---
  const [sidebarUser, setSidebarUser] = useState({
    nombre: 'Cargando...',
    subtitulo: 'Estudiante',
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
            setSidebarUser({
              // Tomamos solo el primer nombre usando split
              nombre: data.nombre.split(' ')[0], 
              // Ponemos la escuela de origen, si no hay, dejamos un texto por defecto
              subtitulo: data.escuela_origen || 'Estudiante', 
              // Le agregamos el rompe-caché para que siempre traiga la foto actualizada
              foto: data.foto_perfil ? `${data.foto_perfil}?t=${Date.now()}` : null
            });
          }
        })
        .catch(err => console.error("Error al cargar datos del sidebar:", err));
    } else {
      // Si por alguna razón no hay boleta, ponemos valores por defecto
      setSidebarUser({ nombre: 'Usuario', subtitulo: 'Invitado', foto: null });
    }
  }, []);

  // --- 3. FUNCIÓN PARA CERRAR SESIÓN ---
  const handleLogout = () => {
    // Borramos la boleta de la memoria para que realmente cierre la sesión
    localStorage.removeItem("boleta");
    // Redirigimos al inicio o recargamos la página
    window.location.href = "/"; // Cambia esta ruta si tu login está en otro lado
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 w-64 p-6 flex flex-col ${
      isDarkMode
        ? 'bg-[#18020E] border-r border-[#2D0418]'
        : 'bg-white border-r border-[#E8E8E8]'
    }`}>
      
      {/* Navegación principal */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onPageChange?.(item.page)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activePage === item.page
                ? 'bg-[#750946] text-white'
                : isDarkMode
                  ? 'text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#E5E5E5]'
                  : 'text-[#333333] hover:bg-[#FDE7F4] hover:text-[#750946]'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* SECCIÓN INFERIOR REDISEÑADA Y DINÁMICA */}
      <div className="mt-auto flex flex-col gap-3">
        
        {/* Info del usuario real */}
        <div className={`p-3 rounded-2xl flex items-center gap-3 border ${
          isDarkMode ? 'bg-[#1a0310] border-[#2D0418]' : 'bg-gray-50 border-gray-100'
        }`}>
          {/* Si hay foto guardada la mostramos, si no, mostramos la inicial de su nombre */}
          {sidebarUser.foto ? (
            <img 
              src={sidebarUser.foto} 
              alt="Perfil" 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#ED128E]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-[#ED128E] bg-[#18020E] flex items-center justify-center text-white font-bold flex-shrink-0">
              {sidebarUser.nombre.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div className="flex flex-col truncate">
            <span className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              {sidebarUser.nombre}
            </span>
            <span className={`text-xs truncate ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              {sidebarUser.subtitulo}
            </span>
          </div>
        </div>

        {/* Botón de Cerrar Sesión Funcional */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all border ${
            isDarkMode 
              ? 'text-red-400 border-transparent hover:bg-red-500/10 hover:border-red-500/20' 
              : 'text-red-500 border-transparent hover:bg-red-50 hover:border-red-100'
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>

    </aside>
  );
}