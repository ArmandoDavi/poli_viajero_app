interface ChatListItemProps {
  avatar: string;
  name: string;
  lastMessage: string;
  isOnline?: boolean;
  isSelected?: boolean;
  time: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

export function ChatListItem({
  avatar,
  name,
  lastMessage,
  isOnline = false,
  isSelected = false,
  time,
  onClick,
  isDarkMode,
}: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-start gap-3 transition-colors text-left ${
        isSelected
          ? isDarkMode
            ? 'bg-[#2D0418]'
            : 'bg-[#FDE7F4]'
          : isDarkMode
            ? 'hover:bg-[#2D0418]'
            : 'hover:bg-[#FDE7F4]'
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#750946]"
        />
        {isOnline && (
          <span className={`absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 ${
            isDarkMode ? 'border-[#18020E]' : 'border-white'
          }`}></span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className={`font-semibold truncate ${
            isDarkMode ? 'text-white' : 'text-[#333333]'
          }`}>
            {name}
          </h3>
          <span className={`text-xs ml-2 flex-shrink-0 ${
            isDarkMode ? 'text-[#A0A0A0]' : 'text-[#999999]'
          }`}>
            {time}
          </span>
        </div>
        <p className={`text-sm truncate ${
          isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'
        }`}>
          {lastMessage}
        </p>
      </div>
    </button>
  );
}
