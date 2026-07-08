import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { Marketplace } from './components/Marketplace';
import { MessagesView } from './components/MessagesView';
import { FriendsView } from './components/FriendsView';
import { ProfileView } from './components/ProfileView';
import { useState, useRef, useEffect } from 'react';
import { Send, ImageIcon, AlertCircle, X } from 'lucide-react'; 
import { EmergencyView } from './components/EmergencyView';
import { ConvocatoriasView } from './components/ConvocatoriasView';
import { AlertasPanel } from './components/AlertasPanel';
import { CalendarView } from './components/CalendarView'; 
import { RestaurantsView } from './components/RestaurantsView'; // <-- 1. IMPORTAMOS LA NUEVA VISTA

const initialPosts: any[] = [];

// Eventos por defecto (Trámites obligatorios)
const initialEventos = [
  { id: 1, tipo: 'urgente', titulo: 'Cierre de Convocatoria Santander', detalle: 'Último día para subir la postulación completa en el sistema oficial de becas.', fecha: '2026-06-20' },
  { id: 2, tipo: 'recordatorio', titulo: 'Entrega de Dictamen SRE', detalle: 'Subir el PDF firmado por el coordinador al portal de movilidad académica.', fecha: '2026-06-25' },
  { id: 3, tipo: 'info', titulo: 'Junta de Orientación (Corea)', detalle: 'Reunión informativa obligatoria sobre visados en el Auditorio de ESCOM.', fecha: '2026-06-28' },
  { id: 4, tipo: 'recordatorio', titulo: 'Validación de Idioma', detalle: 'Fecha límite para entregar la constancia B1/B2 equivalente en el CENLEX.', fecha: '2026-07-05' }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('inicio'); 
  const [searchQuery, setSearchQuery] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: 'Usuario',
    profileImage: 'https://placehold.co/100x100/18020E/A0A0A0?text=U',
    country: 'Destino',
    countryFlag: '🌍'
  });

  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  
  const feedImageInputRef = useRef<HTMLInputElement>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  const [eventos, setEventos] = useState(initialEventos);

  // --- MEMORIA PARA EL MODAL DE USUARIO ---
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalUserData, setModalUserData] = useState<any>(null);

  // --- MEMORIA PARA REDIRIGIR AL CHAT ---
  const [targetChatBoleta, setTargetChatBoleta] = useState<string | null>(null);

  useEffect(() => {
    const boletaUsuario = localStorage.getItem("boleta");
    if (boletaUsuario) {
      // 1. Cargar datos del usuario
      fetch(`http://localhost:8000/api/usuarios/${boletaUsuario}`)
        .then(res => res.json())
        .then(data => {
          if (!data.detail) {
            setCurrentUser({
              name: data.nombre.split(' ')[0],
              profileImage: data.foto_perfil ? `${data.foto_perfil}?t=${Date.now()}` : 'https://placehold.co/100x100/18020E/A0A0A0?text=U',
              country: data.destino !== '---' ? data.destino.replace(/[^\w\s]/gi, '').trim() : 'Destino',
              countryFlag: data.destino !== '---' ? (data.destino.slice(-2) || '🌍') : '🌍'
            });
          }
        });

      // 2. Cargar historial de publicaciones GLOBALES
      fetch(`http://localhost:8000/api/feed`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const postsGuardados = data.map((post: any) => ({
              id: post.id,
              boleta_usuario: post.boleta_usuario,
              username: post.username,
              profileImage: post.profile_image,
              timePosted: post.time_posted,
              postText: post.post_text,
              postImage: post.post_image,
              // Tomamos el destino que viene del post, no del usuario actual
              country: post.destino || "Destino",
              countryFlag: "🌍",
              likes: post.likes,
              comments: post.comments,
            }));
            setFeedPosts(postsGuardados);
          }
        })
        .catch(err => console.error("Error cargando el feed:", err));

      // 3. Cargar el Calendario Personal de la base de datos
      fetch(`http://localhost:8000/api/eventos/${boletaUsuario}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setEventos([...initialEventos, ...data]);
          }
        })
        .catch(err => console.error("Error cargando el calendario:", err));
    }
  }, [activePage]);

  // --- FUNCIÓN PARA ABRIR EL MODAL DEL USUARIO ---
  const handleOpenUserModal = async (boleta: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/usuarios/${boleta}`);
      const data = await res.json();
      if (!data.detail) {
        setModalUserData(data);
        setShowUserModal(true);
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  
  const handleAgregarEvento = async (nuevoEvento: { titulo: string; fecha: string; tipo: string; detalle?: string }) => {
    const boletaUsuario = localStorage.getItem("boleta");
    if (!boletaUsuario) return;

    const detalleFinal = nuevoEvento.detalle || 'Evento agendado desde tu calendario de movilidad.';

    try {
      const res = await fetch("http://localhost:8000/api/eventos/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boleta_usuario: boletaUsuario,
          tipo: nuevoEvento.tipo,
          titulo: nuevoEvento.titulo,
          detalle: detalleFinal,
          fecha: nuevoEvento.fecha
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        const eventoCompleto = {
          ...nuevoEvento,
          id: data.id, 
          detalle: detalleFinal 
        };
        setEventos([...eventos, eventoCompleto]);
      }
    } catch (error) {
      console.error("Error guardando el evento:", error);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/posts/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.status === "success") {
        setNewPostImage(data.url); 
      }
    } catch (error) {
      console.error("Error subiendo foto de post:", error);
    }
    if (event.target) event.target.value = '';
  };

  const handleCreateFeedPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim() === "" && !newPostImage) return;

    const boletaUsuario = localStorage.getItem("boleta");
    if (!boletaUsuario) return;

    try {
      const res = await fetch("http://localhost:8000/api/posts/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boleta_usuario: boletaUsuario,
          username: currentUser.name,
          profile_image: currentUser.profileImage,
          post_text: newPostText,
          post_image: newPostImage || ""
        })
      });

      if (res.ok) {
        const postsRes = await fetch(`http://localhost:8000/api/feed`);
        const postsData = await postsRes.json();
        
        if (Array.isArray(postsData)) {
          const postsGuardados = postsData.map((post: any) => ({
            id: post.id,
            boleta_usuario: post.boleta_usuario,
            username: post.username,
            profileImage: post.profile_image,
            timePosted: post.time_posted,
            postText: post.post_text,
            postImage: post.post_image,
            country: post.destino || "Destino",
            countryFlag: "🌍",
            likes: post.likes,
            comments: post.comments,
          }));
          setFeedPosts(postsGuardados);
        }

        setNewPostText("");
        setNewPostImage(null);
      }
    } catch (error) {
      console.error("Error al publicar en el muro:", error);
    }
  };

  const handleOpenDeleteModal = (postId: number) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (postIdToDelete) {
      try {
        const res = await fetch(`http://localhost:8000/api/posts/${postIdToDelete}`, {
          method: "DELETE"
        });
        const data = await res.json();

        if (res.ok && data.status === "success") {
          setFeedPosts(feedPosts.filter(post => post.id !== postIdToDelete));
          setShowDeleteModal(false);
          setPostIdToDelete(null);
        }
      } catch (error) {
        console.error("Error conectando con la ruta de eliminación:", error);
      }
    }
  };

  // --- FILTRO DE PUBLICACIONES BASADO EN LA BÚSQUEDA ---
  const filteredPosts = feedPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.postText.toLowerCase().includes(query) ||
      post.username.toLowerCase().includes(query) ||
      post.country.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className={
        isDarkMode
          ? "dark min-h-screen bg-[#121212] font-sans"
          : "min-h-screen bg-white font-sans"
      }
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        // CONECTAMOS EL NAVBAR CON LA BARRA DE BÚSQUEDA
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Sidebar
        isDarkMode={isDarkMode}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <input
        type="file"
        ref={feedImageInputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <main className="ml-64 mt-16">
        {activePage === "inicio" ? (
          <div className="flex gap-6 p-6">
            <div className="flex-1 flex flex-col items-center gap-6">
              <div
                className={`w-full max-w-2xl rounded-2xl p-4 border shadow-sm ${isDarkMode ? "bg-[#18020E] border-[#2D0418]" : "bg-white border-[#F0D0E0]"}`}
              >
                <form onSubmit={handleCreateFeedPost}>
                  <div className="flex gap-4">
                    <img
                      src={currentUser.profileImage}
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover border border-[#ED128E]/30 bg-[#18020E]"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder={`¿Qué nos quieres contar hoy, ${currentUser.name}?`}
                        className={`w-full bg-transparent border-none resize-none focus:ring-0 p-2 text-base ${isDarkMode ? "text-white placeholder-[#A0A0A0]" : "text-[#333333] placeholder-[#666666]"}`}
                        rows={2}
                      />
                      {newPostImage && (
                        <div className="relative mt-2 inline-block">
                          <img
                            src={newPostImage}
                            alt="Preview"
                            className="max-h-48 rounded-xl object-cover border border-gray-600/30"
                          />
                          <button
                            type="button"
                            onClick={() => setNewPostImage(null)}
                            className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
                            title="Quitar foto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex justify-between items-center mt-4 pt-3 border-t ${isDarkMode ? "border-[#2D0418]" : "border-[#F0D0E0]"}`}
                  >
                    <button
                      type="button"
                      onClick={() => feedImageInputRef.current?.click()}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-medium ${isDarkMode ? "text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#ED128E]" : "text-[#666666] hover:bg-[#FDE7F4] hover:text-[#750946]"}`}
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Añadir foto</span>
                    </button>
                    <button
                      type="submit"
                      disabled={newPostText.trim() === "" && !newPostImage}
                      className="flex items-center gap-2 bg-[#ED128E] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#c90d76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      Publicar
                    </button>
                  </div>
                </form>
              </div>

              <div className="w-full max-w-2xl">
                {/* AHORA USAMOS FILTEREDPOSTS EN LUGAR DE FEEDPOSTS */}
                {filteredPosts.length === 0 ? (
                  <div
                    className={`text-center py-10 ${isDarkMode ? "text-[#A0A0A0]" : "text-[#666666]"}`}
                  >
                    {searchQuery 
                      ? `No hay resultados para "${searchQuery}"` 
                      : "No hay publicaciones aún. ¡Sé el primero en compartir algo!"}
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      {...post}
                      isDarkMode={isDarkMode}
                      onDelete={() => handleOpenDeleteModal(post.id)}
                      onUserClick={() =>
                        handleOpenUserModal(post.boleta_usuario)
                      }
                    />
                  ))
                )}
              </div>
            </div>

            <aside className="w-80 sticky top-20 h-fit flex-shrink-0">
              <AlertasPanel
                isDarkMode={isDarkMode}
                eventos={eventos}
                onViewCalendar={() => setActivePage("calendario")}
              />
            </aside>
          </div>
        ) : activePage === "calendario" ? (
          <CalendarView
            isDarkMode={isDarkMode}
            eventos={eventos}
            onAddEvento={handleAgregarEvento}
            onBack={() => setActivePage("inicio")}
          />
        ) : activePage === "mercado" ? (
          <Marketplace
            isDarkMode={isDarkMode}
            onNavigateToChat={(boleta) => {
              setTargetChatBoleta(boleta);
              setActivePage("mensajes");
            }}
          />
        ) : activePage === "mensajes" ? (
          <MessagesView
            isDarkMode={isDarkMode}
            targetBoleta={targetChatBoleta}
            onClearTarget={() => setTargetChatBoleta(null)}
          />
        ) : activePage === "amigos" ? (
          <FriendsView isDarkMode={isDarkMode} />
        ) : activePage === "perfil" ? (
          <ProfileView isDarkMode={isDarkMode} />
        ) : activePage === "emergencias" ? (
          <EmergencyView isDarkMode={isDarkMode} />
        ) : activePage === "convocatorias" ? (
          <ConvocatoriasView isDarkMode={isDarkMode} />
        ) : activePage === "restaurantes" ? (          // <-- 2. AQUI CONECTAMOS EL COMPONENTE
          <RestaurantsView isDarkMode={isDarkMode} />
        ) : (
          <div className="p-6">
            <div
              className={`rounded-2xl p-8 text-center border ${isDarkMode ? "bg-[#18020E] border-[#2D0418]" : "bg-white border-[#F0D0E0]"}`}
            >
              <h2
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#333333]"}`}
              >
                Próximamente
              </h2>
              <p
                className={`mt-2 ${isDarkMode ? "text-[#A0A0A0]" : "text-[#666666]"}`}
              >
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
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#ED128E]/20 mb-4">
              <AlertCircle className="w-8 h-8 text-[#ED128E]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              ¿Eliminar publicación?
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              ¿Estás seguro de que quieres borrar esta publicación? Esta acción
              no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-500/20 text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-500/40 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-[#ED128E] text-white font-semibold py-3 rounded-xl hover:bg-[#c90d76] transition-colors shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PERFIL DE USUARIO */}
      {showUserModal && modalUserData && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowUserModal(false)}
        >
          <div
            className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center border ${
              isDarkMode
                ? "bg-[#18020E] border-[#2D0418]"
                : "bg-white border-[#F0D0E0]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUserModal(false)}
              className={`absolute top-4 right-4 transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={
                modalUserData.foto_perfil
                  ? `${modalUserData.foto_perfil}?t=${Date.now()}`
                  : "https://placehold.co/100x100/18020E/A0A0A0?text=U"
              }
              alt={modalUserData.nombre}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#ED128E] bg-[#18020E]"
            />

            <h3
              className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#333333]"}`}
            >
              {modalUserData.nombre.split(" ")[0]}
            </h3>

            <p
              className={`text-sm font-medium mb-4 ${isDarkMode ? "text-[#ED128E]" : "text-[#750946]"}`}
            >
              Destino:{" "}
              {modalUserData.destino !== "---"
                ? modalUserData.destino
                : "Sin asignar"}
            </p>

            <div
              className={`p-4 rounded-xl text-left text-sm mb-6 ${isDarkMode ? "bg-[#2D0418] text-[#E5E5E5]" : "bg-[#FDE7F4] text-[#666666]"}`}
            >
              <p>
                <strong>Escuela:</strong>{" "}
                {modalUserData.escuela_origen || "No especificada"}
              </p>
              <p>
                <strong>Carrera:</strong>{" "}
                {modalUserData.carrera || "No especificada"}
              </p>
              {modalUserData.descripcion_corta && (
                <p className="mt-2 italic">
                  "{modalUserData.descripcion_corta}"
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setTargetChatBoleta(modalUserData.boleta);
                setShowUserModal(false);
                setActivePage("mensajes");
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#750946] text-white font-semibold py-3 rounded-xl hover:bg-[#5a0635] transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
              Mandar mensaje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}