import { UserPlus } from 'lucide-react';

interface SuggestedUserProps {
  profileImage: string;
  username: string;
  mutualFriends: number;
  isDarkMode: boolean;
}

export function SuggestedUser({ profileImage, username, mutualFriends, isDarkMode }: SuggestedUserProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
      isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
    }`}>
      <img
        src={profileImage}
        alt={username}
        className="w-12 h-12 rounded-full object-cover border-2 border-[#750946]"
      />
      <div className="flex-1">
        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
          {username}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
          {mutualFriends} amigos en común
        </p>
      </div>
      <button className={`p-2 rounded-full transition-all ${
        isDarkMode ? 'bg-[#750946] hover:bg-[#980B5B]' : 'bg-[#750946] hover:bg-[#420528]'
      }`}>
        <UserPlus className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
