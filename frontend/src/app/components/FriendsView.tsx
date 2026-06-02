import { FriendCard } from './FriendCard';
import { FriendRequest } from './FriendRequest';
import { SuggestedUser } from './SuggestedUser';

interface FriendsViewProps {
  isDarkMode: boolean;
}

const friendRequests = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Isabella Rossi', mutualFriends: 8 },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Lucas Kim', mutualFriends: 5 },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Emma Tanaka', mutualFriends: 12 },
];

const friends = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Ana Martínez', school: 'ESCOM-IPN', currentLocation: 'Madrid, España', countryFlag: '🇪🇸', mutualFriends: 15 },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Carlos Hernández', school: 'FI-UNAM', currentLocation: 'Berlín, Alemania', countryFlag: '🇩🇪', mutualFriends: 22 },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'María González', school: 'ITESM', currentLocation: 'París, Francia', countryFlag: '🇫🇷', mutualFriends: 18 },
  { id: 4, avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Diego López', school: 'UAM', currentLocation: 'Barcelona, España', countryFlag: '🇪🇸', mutualFriends: 10 },
  { id: 5, avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Laura Pérez', school: 'CUCEI-UDG', currentLocation: 'Roma, Italia', countryFlag: '🇮🇹', mutualFriends: 14 },
  { id: 6, avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Roberto Sánchez', school: 'IPN-ESIA', currentLocation: 'Lisboa, Portugal', countryFlag: '🇵🇹', mutualFriends: 9 },
];

const suggestedUsers = [
  { id: 1, profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', username: 'Jessica Lee', mutualFriends: 12 },
  { id: 2, profileImage: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', username: 'David Park', mutualFriends: 8 },
  { id: 3, profileImage: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080', username: 'Mia Anderson', mutualFriends: 15 },
  { id: 4, profileImage: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080', username: 'Ryan Martinez', mutualFriends: 6 },
];

export function FriendsView({ isDarkMode }: FriendsViewProps) {
  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        {friendRequests.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              Solicitudes Pendientes
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {friendRequests.map((request) => (
                <FriendRequest key={request.id} {...request} isDarkMode={isDarkMode} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            Tus Conexiones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend.id} {...friend} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </div>

      <aside className="w-80 sticky top-20 h-fit">
        <div className={`rounded-2xl p-6 border ${
          isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
        }`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            Gente que quizás conozcas
          </h2>
          <div className="space-y-2">
            {suggestedUsers.map((user) => (
              <SuggestedUser key={user.id} {...user} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
