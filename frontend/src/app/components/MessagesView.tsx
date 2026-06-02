import { ChatListItem } from './ChatListItem';
import { ChatWindow } from './ChatWindow';
import { useState } from 'react';

interface MessagesViewProps {
  isDarkMode: boolean;
}

const chats = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Sofía (Berlín)', lastMessage: '¡Perfecto! Nos vemos allí entonces 😊', isOnline: true, time: '10:45' },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', name: 'David (Seúl)', lastMessage: 'Gracias por la recomendación del restaurante', isOnline: false, time: 'Ayer' },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Grupo Movilidad 2024', lastMessage: 'María: ¿Alguien sabe dónde renovar el visado?', isOnline: true, time: '09:30' },
  { id: 4, avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Alex (Madrid)', lastMessage: 'Quedamos el sábado para explorar el centro', isOnline: false, time: 'Mar 11' },
];

const conversationMessages = [
  { id: 1, text: 'Hola! ¿Cómo va todo por Berlín?', isMine: true, time: '10:30' },
  { id: 2, text: '¡Hola! Todo genial, me estoy adaptando bien. El clima es un poco frío pero me encanta la ciudad 😊', isMine: false, time: '10:32' },
  { id: 3, text: 'Qué bueno! Oye, ¿conoces algún lugar donde vendan adaptadores de corriente europeos baratos?', isMine: true, time: '10:35' },
  { id: 4, text: 'Sí, hay una tienda cerca de Alexanderplatz que tiene buenos precios. También puedes buscar en el mercado que hay los domingos', isMine: false, time: '10:38' },
  { id: 5, text: 'Perfecto, gracias! Voy a pasar este fin de semana', isMine: true, time: '10:40' },
  { id: 6, text: '¡Perfecto! Nos vemos allí entonces 😊', isMine: false, time: '10:45' },
];

export function MessagesView({ isDarkMode }: MessagesViewProps) {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || chats[0];

  return (
    <div className="flex gap-6 p-6 h-[calc(100vh-4rem)]">
      {/* Left Column - Chat List */}
      <div className={`w-96 rounded-2xl overflow-hidden border ${
        isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
      }`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            Mensajes
          </h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              isSelected={chat.id === selectedChatId}
              onClick={() => setSelectedChatId(chat.id)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>

      {/* Right Column - Active Chat Window */}
      <div className="flex-1">
        <ChatWindow
          contactName={selectedChat.name}
          contactAvatar={selectedChat.avatar}
          lastSeen="Última conexión: hace 5 min"
          messages={conversationMessages}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
