import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { SuggestedUser } from './components/SuggestedUser';
import { Marketplace } from './components/Marketplace';
import { MessagesView } from './components/MessagesView';
import { FriendsView } from './components/FriendsView';
import { ProfileView } from './components/ProfileView';
import { useState, useRef } from 'react';
import { Send, ImageIcon, AlertCircle, X } from 'lucide-react'; // Íconos nuevos para el feed

// Cambiamos el nombre a initialPosts para usarlo en la memoria
const initialPosts = [
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
  const [activePage, setActivePage] = useState('perfil'); // Inicia en el perfil como lo dejaste

  // --- MEMORIA DEL FEED PRINCIPAL ---
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  
  const feedImageInputRef = useRef<HTMLInputElement>(null);

  // --- MEMORIA PARA ELIMINAR POSTS ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  // Funciones de Creación de Post en el Muro
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPostImage(URL.createObjectURL(file));
    }
    if (event.target) event.target.value = '';
  };

  const handleCreateFeedPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim() === "" && !newPostImage) return;

    const newPostToAdd = {
      id: Date.now(),
      profileImage: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080', // Avatar de ejemplo
      username: 'Armando Davila', // ¡Tu nombre!
      country: 'México',
      countryFlag: '🇲🇽',
      timePosted: 'Hace un momento',
      postText: newPostText,
      postImage: newPostImage || '',
      likes: 0,
      comments: 0,
    };

    setFeedPosts([newPostToAdd, ...feedPosts]);
    setNewPostText("");
    setNewPostImage(null);
  };

  // Funciones de Borrado
  const handleOpenDeleteModal = (postId: number) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      setFeedPosts(feedPosts.filter(post => post.id !== postIdToDelete));
      setShowDeleteModal(false);
      setPostIdToDelete(null);
    }
  };

  return (
    <div className={isDarkMode ? 'dark min-h-screen bg-[#121212] font-sans' : 'min-h-screen bg-white font-sans'}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Sidebar isDarkMode={isDarkMode} activePage={activePage} onPageChange={setActivePage} />

      {/* Input de archivo oculto para el muro */}
      <input type="file" ref={feedImageInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />

      {/* Main Content */}
      <main className="ml-64 mt-16">
        {activePage === 'inicio' ? (
          <div className="flex gap-6 p-6">
            
            {/* Feed Central - Hecho más ancho con flex-1 y max-w-2xl */}
            <div className="flex-1 flex flex-col items-center gap-6">
              
              {/* CAJA DE NUEVA PUBLICACIÓN */}
              <div className={`w-full max-w-2xl rounded-2xl p-4 border shadow-sm ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
                <form onSubmit={handleCreateFeedPost}>
                  <div className="flex gap-4">
                    <img src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="User" className="w-12 h-12 rounded-full object-cover border border-[#ED128E]/30" />
                    <div className="flex-1">
                      <textarea
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder="¿Qué nos quieres contar hoy, Armando?"
                        className={`w-full bg-transparent border-none resize-none focus:ring-0 p-2 text-base ${isDarkMode ? 'text-white placeholder-[#A0A0A0]' : 'text-[#333333] placeholder-[#666666]'}`}
                        rows={2}
                      />
                      {/* Vista previa de imagen */}
                      {newPostImage && (
                        <div className="relative mt-2 inline-block">
                          <img src={newPostImage} alt="Preview" className="max-h-48 rounded-xl object-cover border border-gray-600/30" />
                          <button type="button" onClick={() => setNewPostImage(null)} className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors" title="Quitar foto">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`flex justify-between items-center mt-4 pt-3 border-t ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
                    <button type="button" onClick={() => feedImageInputRef.current?.click()} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#ED128E]' : 'text-[#666666] hover:bg-[#FDE7F4] hover:text-[#750946]'}`}>
                      <ImageIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Añadir foto</span>
                    </button>
                    <button type="submit" disabled={newPostText.trim() === '' && !newPostImage} className="flex items-center gap-2 bg-[#ED128E] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#c90d76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                      <Send className="w-4 h-4" />
                      Publicar
                    </button>
                  </div>
                </form>
              </div>

              {/* LISTA DE PUBLICACIONES DEL MURO */}
              <div className="w-full max-w-2xl">
                {feedPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    {...post} 
                    isDarkMode={isDarkMode} 
                    onDelete={() => handleOpenDeleteModal(post.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="w-80 sticky top-20 h-fit flex-shrink-0">
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
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

      {/* MODAL GLOBAL DE ELIMINACIÓN */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#18020E] border border-[#ED128E]/50 rounded-2xl p-6 shadow-[0_0_40px_-10px_rgba(237,18,142,0.3)] text-center">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#ED128E]/20 mb-4">
              <AlertCircle className="w-8 h-8 text-[#ED128E]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¿Eliminar publicación?</h3>
            <p className="text-sm text-gray-300 mb-6">
              ¿Estás seguro de que quieres borrar esta publicación? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-500/20 text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-500/40 transition-colors">
                Cancelar
              </button>
              <button onClick={handleConfirmDelete} className="flex-1 bg-[#ED128E] text-white font-semibold py-3 rounded-xl hover:bg-[#c90d76] transition-colors shadow-md">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}