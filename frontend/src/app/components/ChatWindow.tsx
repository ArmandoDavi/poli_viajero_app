import { Paperclip, Send, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
}

interface ChatWindowProps {
  contactName: string;
  contactAvatar: string;
  lastSeen: string;
  messages: Message[];
  isDarkMode: boolean;
}

export function ChatWindow({
  contactName,
  contactAvatar,
  lastSeen,
  messages,
  isDarkMode,
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');

  return (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden border ${
      isDarkMode
        ? 'bg-[#18020E] border-[#2D0418]'
        : 'bg-white border-[#F0D0E0]'
    }`}>
      {/* Chat Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'
      }`}>
        <div className="flex items-center gap-3">
          <img
            src={contactAvatar}
            alt={contactName}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#750946]"
          />
          <div>
            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              {contactName}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
              {lastSeen}
            </p>
          </div>
        </div>
        <button className={`p-2 rounded-full transition-colors ${
          isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
        }`}>
          <MoreVertical className={`w-5 h-5 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[70%]">
              <div className={`rounded-2xl px-4 py-2.5 ${
                message.isMine
                  ? 'bg-[#750946] text-white rounded-br-sm'
                  : isDarkMode
                    ? 'bg-[#2D0418] text-[#E5E5E5] rounded-bl-sm'
                    : 'bg-[#FDE7F4] text-[#333333] rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <span className={`text-xs mt-1 block ${
                message.isMine ? 'text-right' : 'text-left'
              } ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#999999]'}`}>
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 border ${
          isDarkMode
            ? 'bg-[#2D0418] border-[#3D0522]'
            : 'bg-[#FDE7F4] border-[#F0C8DF]'
        }`}>
          <button className={`p-1.5 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-[#3D0522]' : 'hover:bg-[#FABDDF]'
          }`}>
            <Paperclip className={`w-5 h-5 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`} />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Escribe un mensaje..."
            className={`flex-1 bg-transparent focus:outline-none ${
              isDarkMode
                ? 'text-[#E5E5E5] placeholder-[#A0A0A0]'
                : 'text-[#333333] placeholder-[#999999]'
            }`}
          />
          <button className={`p-1.5 rounded-full transition-colors ${
            isDarkMode ? 'bg-[#750946] hover:bg-[#980B5B]' : 'bg-[#750946] hover:bg-[#420528]'
          }`}>
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
