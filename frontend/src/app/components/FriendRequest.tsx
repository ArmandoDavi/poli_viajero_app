import { Check, X } from 'lucide-react';

interface FriendRequestProps {
  avatar: string;
  name: string;
  mutualFriends: number;
  isDarkMode: boolean;
}

export function FriendRequest({
  avatar,
  name,
  mutualFriends,
  isDarkMode,
}: FriendRequestProps) {
  return (
    <div className={`rounded-2xl p-4 flex-shrink-0 w-72 border ${
      isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#750946]"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            {name}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            {mutualFriends} amigos en común
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
          isDarkMode ? 'bg-[#750946] hover:bg-[#980B5B]' : 'bg-[#750946] hover:bg-[#420528]'
        }`}>
          <Check className="w-4 h-4" />
          Aceptar
        </button>
        <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isDarkMode
            ? 'bg-[#2D0418] hover:bg-[#3D0522] text-[#E5E5E5]'
            : 'bg-[#FDE7F4] hover:bg-[#FABDDF] text-[#750946]'
        }`}>
          <X className="w-4 h-4" />
          Rechazar
        </button>
      </div>
    </div>
  );
}
