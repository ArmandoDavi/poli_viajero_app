import { MessageCircle, MoreVertical, Users } from 'lucide-react';

interface FriendCardProps {
  avatar: string;
  name: string;
  school: string;
  currentLocation: string;
  countryFlag: string;
  mutualFriends: number;
  isDarkMode: boolean;
}

export function FriendCard({
  avatar,
  name,
  school,
  currentLocation,
  countryFlag,
  mutualFriends,
  isDarkMode,
}: FriendCardProps) {
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all ${
      isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
    }`}>
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#750946]"
          />
        </div>

        <h3 className={`text-center font-bold text-lg mb-1 ${
          isDarkMode ? 'text-white' : 'text-[#333333]'
        }`}>
          {name}
        </h3>

        <p className={`text-center text-sm mb-3 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
          {school}
        </p>

        <div className={`flex items-center justify-center gap-1.5 mb-3 text-sm ${
          isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'
        }`}>
          <span className="text-lg">{countryFlag}</span>
          <span>{currentLocation}</span>
        </div>

        <div className={`flex items-center justify-center gap-1.5 mb-4 text-sm ${
          isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'
        }`}>
          <Users className="w-4 h-4" />
          <span>{mutualFriends} amigos en común</span>
        </div>

        <div className="flex items-center gap-2">
          <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-medium rounded-xl transition-colors ${
            isDarkMode ? 'bg-[#750946] hover:bg-[#980B5B]' : 'bg-[#750946] hover:bg-[#420528]'
          }`}>
            <MessageCircle className="w-4 h-4" />
            Enviar Mensaje
          </button>
          <button className={`p-2.5 rounded-xl transition-colors ${
            isDarkMode ? 'bg-[#2D0418] hover:bg-[#3D0522]' : 'bg-[#FDE7F4] hover:bg-[#FABDDF]'
          }`}>
            <MoreVertical className={`w-5 h-5 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#750946]'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
