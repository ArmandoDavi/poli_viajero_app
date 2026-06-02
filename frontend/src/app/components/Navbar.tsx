import { Search, Bell, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 z-50 ${
      isDarkMode
        ? 'bg-[#18020E] border-b border-[#2D0418]'
        : 'bg-white border-b border-[#E8E8E8]'
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#750946] flex items-center justify-center">
            <span className="text-white text-xl font-bold">P</span>
          </div>
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
            <input
              type="text"
              placeholder="Buscar..."
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
          <button className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
            isDarkMode ? 'border-[#750946]' : 'border-[#750946]'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
