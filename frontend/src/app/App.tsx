import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { SuggestedUser } from './components/SuggestedUser';
import { Marketplace } from './components/Marketplace';
import { MessagesView } from './components/MessagesView';
import { FriendsView } from './components/FriendsView';
import { ProfileView } from './components/ProfileView';
import { useState } from 'react';

const posts = [
  {
    id: 1,
    profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Sarah Johnson',
    country: 'EE. UU.',
    countryFlag: '🇺🇸',
    timePosted: 'hace 2h',
    postText: '¡Acabo de capturar esta impresionante vista del atardecer! La naturaleza nunca deja de asombrarme 🌅✨',
    postImage: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc2MTk4NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    likes: 1234,
    comments: 87,
  },
  {
    id: 2,
    profileImage: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Marcus Chen',
    country: 'Singapur',
    countryFlag: '🇸🇬',
    timePosted: 'hace 5h',
    postText: 'Explorando las maravillas arquitectónicas de la ciudad. ¡La combinación de diseño moderno y tradicional es simplemente impresionante! 🏙️',
    postImage: 'https://images.unsplash.com/photo-1617381519460-d87050ddeb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NjIxNjcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    likes: 2567,
    comments: 143,
  },
  {
    id: 3,
    profileImage: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Emma Tanaka',
    country: 'Japón',
    countryFlag: '🇯🇵',
    timePosted: 'hace 8h',
    postText: '¡Objetivos de brunch alcanzados! Este lugar tiene la presentación y combinaciones de sabores más increíbles 🍽️💫',
    postImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzYyMjU4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    likes: 3421,
    comments: 198,
  },
  {
    id: 4,
    profileImage: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Alex Rivera',
    country: 'España',
    countryFlag: '🇪🇸',
    timePosted: 'hace 12h',
    postText: '¡La aventura espera! A veces solo necesitas dar el salto y explorar lo desconocido 🌍⛰️',
    postImage: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzc2MjIxNzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    likes: 4892,
    comments: 234,
  },
];

const suggestedUsers = [
  {
    id: 1,
    profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Jessica Lee',
    mutualFriends: 12,
  },
  {
    id: 2,
    profileImage: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'David Park',
    mutualFriends: 8,
  },
  {
    id: 3,
    profileImage: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Mia Anderson',
    mutualFriends: 15,
  },
  {
    id: 4,
    profileImage: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    username: 'Ryan Martinez',
    mutualFriends: 6,
  },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('perfil');

  return (
    <div className={isDarkMode ? 'dark min-h-screen bg-[#121212]' : 'min-h-screen bg-white'}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Sidebar isDarkMode={isDarkMode} activePage={activePage} onPageChange={setActivePage} />

      {/* Main Content */}
      <main className="ml-64 mt-16">
        {activePage === 'inicio' ? (
          <div className="flex gap-6 p-6">
            {/* Feed */}
            <div className="flex-1 max-w-2xl">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} isDarkMode={isDarkMode} />
              ))}
            </div>

            {/* Right Sidebar */}
            <aside className="w-80 sticky top-20 h-fit">
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
                <h2 className={`text-lg font-bold mb-4 ${
                  isDarkMode
                    ? 'text-white'
                    : 'text-[#333333]'
                }`}>
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
        ) : activePage === 'mercado' ? (
          <Marketplace isDarkMode={isDarkMode} />
        ) : activePage === 'mensajes' ? (
          <MessagesView isDarkMode={isDarkMode} />
        ) : activePage === 'amigos' ? (
          <FriendsView isDarkMode={isDarkMode} />
        ) : activePage === 'perfil' ? (
          <ProfileView isDarkMode={isDarkMode} />
        ) : (
          <div className="p-6">
            <div className={`rounded-2xl p-8 text-center border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                Próximamente
              </h2>
              <p className={`mt-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
                Esta sección está en desarrollo
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}