import { Home, ShoppingBag, MessageCircle, User } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  activePage?: string;
  onPageChange?: (page: string) => void;
}

const menuItems = [
  { icon: Home, label: 'Inicio', page: 'inicio' },
  { icon: ShoppingBag, label: 'Mercado', page: 'mercado' },
  { icon: MessageCircle, label: 'Mensajes', page: 'mensajes' },
  { icon: User, label: 'Perfil', page: 'perfil' },
];

export function Sidebar({ isDarkMode, activePage = 'inicio', onPageChange }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-16 bottom-0 w-64 p-6 ${
      isDarkMode
        ? 'bg-[#18020E] border-r border-[#2D0418]'
        : 'bg-white border-r border-[#E8E8E8]'
    }`}>
      <nav className="space-y-2">
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
    </aside>
  );
}
