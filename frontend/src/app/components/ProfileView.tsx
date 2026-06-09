import { MapPin, GraduationCap, BookOpen, Calendar, ImageIcon, ShoppingBag, FileText, Edit2, Save, X, Camera, Send } from 'lucide-react';
import { PostCard } from './PostCard';
import { useState, useRef } from 'react';

interface ProfileViewProps {
  isDarkMode: boolean;
}

const initialPosts = [
  {
    id: 1,
    profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'Sarah Johnson', country: 'Corea del Sur', countryFlag: '🇰🇷', timePosted: 'hace 2 días',
    postText: '¡Primera semana en Seúl completada! La experiencia ha sido increíble. El campus es enorme y la comida es deliciosa 🍜✨',
    postImage: 'https://images.unsplash.com/photo-1723174391648-9e73f8865a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc3ODU1Mzc4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 1842, comments: 156,
  },
  {
    id: 2,
    profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'Sarah Johnson', country: 'Corea del Sur', countryFlag: '🇰🇷', timePosted: 'hace 5 días',
    postText: 'Explorando los mercados tradicionales. ¡Hay tantas cosas por descubrir! Recomiendo el mercado de Namdaemun 🛍️',
    postImage: 'https://images.unsplash.com/photo-1617381519460-d87050ddeb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NjIxNjcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 2103, comments: 189,
  },
];

export function ProfileView({ isDarkMode }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('publicaciones');
  
  // --- MEMORIA DE LAS PUBLICACIONES ---
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  // NUEVO: Memoria para la foto de la publicación
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  // --- ESTADO DE INTERFAZ: MODO EDICIÓN ---
  const [isEditing, setIsEditing] = useState(false);

  // --- REFERENCIAS PARA LOS INPUTS DE ARCHIVO (OCULTOS) ---
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  // NUEVO: Referencia para la foto de la publicación
  const postImageInputRef = useRef<HTMLInputElement>(null);

  // --- MEMORIA DE LOS DATOS DEL PERFIL ---
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    subtitle: 'Estudiante de ESCOM - IPN | Movilidad en Seúl, Corea del Sur 🇰🇷',
    bio: 'Apasionada por la ingeniería y los viajes. Actualmente en intercambio académico. ¡Contáctame si necesitas tips sobre Seúl!',
    escuela: 'ESCOM-IPN',
    carrera: 'ISC',
    semestre: '6to',
    destino: 'Corea del Sur 🇰🇷',
    profileImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    coverImage: 'https://images.unsplash.com/photo-1723174391648-9e73f8865a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc3ODU1Mzc4MXww&ixlib=rb-4.1.0&q=80&w=1080'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field: 'profileImage' | 'coverImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, [field]: imageUrl }));
    }
  };
  // --- NUEVA LÓGICA: ELIMINAR PUBLICACIÓN ---
  const handleDeletePost = (postIdToDelete: number) => {
    // Filtramos la lista para quedarnos con todos los posts, EXCEPTO el que queremos borrar
    setPosts(posts.filter(post => post.id !== postIdToDelete));
  };
  // NUEVO: Función para adjuntar foto a la publicación
  const handlePostImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPostImage(imageUrl);
    }
    // Reseteamos el input para que permita subir la misma foto si la borraste
    if (event.target) event.target.value = '';
  };

  const handleSave = () => {
    console.log("Datos listos para enviar al backend:", profileData);
    setIsEditing(false);
  };

  // --- LÓGICA PARA CREAR NUEVA PUBLICACIÓN ---
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // Validamos que haya texto o imagen (o ambas)
    if (newPostText.trim() === '' && !newPostImage) return;

    const newPost = {
      id: Date.now(),
      profileImage: profileData.profileImage,
      username: profileData.name,
      country: profileData.destino.replace(/[^\w\s]/gi, '').trim(),
      countryFlag: profileData.destino.slice(-2),
      timePosted: 'Hace un momento',
      postText: newPostText,
      postImage: newPostImage || '', // Toma la imagen si existe
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostImage(null); // Limpiamos la imagen después de publicar
  };

  const mobilityInfo = [
    { id: 'escuela', icon: GraduationCap, label: 'Escuela de origen', value: profileData.escuela },
    { id: 'carrera', icon: BookOpen, label: 'Carrera', value: profileData.carrera },
    { id: 'semestre', icon: Calendar, label: 'Semestre actual', value: profileData.semestre },
    { id: 'destino', icon: MapPin, label: 'País de destino', value: profileData.destino },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 font-sans">
      
      {/* INPUTS DE ARCHIVO OCULTOS */}
      <input type="file" ref={profileInputRef} accept="image/*" onChange={(e) => handleImageChange('profileImage', e)} className="hidden" />
      <input type="file" ref={coverInputRef} accept="image/*" onChange={(e) => handleImageChange('coverImage', e)} className="hidden" />
      <input type="file" ref={postImageInputRef} accept="image/*" onChange={handlePostImageChange} className="hidden" /> {/* Input para posts */}

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Profile Header Card */}
        <div className={`rounded-2xl overflow-hidden mb-6 border relative ${
          isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
        }`}>
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="p-2.5 bg-gray-500/60 hover:bg-gray-500 backdrop-blur-md rounded-full text-white transition-colors" title="Cancelar">
                  <X className="w-5 h-5" />
                </button>
                <button onClick={handleSave} className="p-2.5 bg-green-500/80 hover:bg-green-500 backdrop-blur-md rounded-full text-white transition-colors shadow-lg" title="Guardar Cambios">
                  <Save className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="p-2.5 bg-black/50 hover:bg-[#ED128E]/80 backdrop-blur-md rounded-full text-white transition-all shadow-lg" title="Editar Perfil">
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative h-64 group">
            <img src={profileData.coverImage} alt="Cover" className="w-full h-full object-cover" />
            {isEditing && (
              <button onClick={() => coverInputRef.current?.click()} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white transition-opacity group-hover:opacity-100">
                <ImageIcon className="w-10 h-10 mb-2" />
                <span className="text-sm font-medium">Cambiar portada</span>
              </button>
            )}
            <div className="absolute -bottom-16 left-8 w-32 h-32 group">
              <img src={profileData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-[#750946] relative z-10" />
              {isEditing && (
                <button onClick={() => profileInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/70 flex flex-col items-center justify-center text-white z-20 transition-opacity">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-xs font-medium">Editar</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-20 px-8 pb-6">
            {isEditing ? (
              <input type="text" value={profileData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={`text-2xl font-bold mb-2 w-full p-2 rounded-xl border focus:outline-none focus:border-[#ED128E] ${isDarkMode ? 'bg-[#250918] text-white border-[#4A0A2D]' : 'bg-gray-50 text-black border-gray-300'}`} />
            ) : (
              <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>{profileData.name}</h1>
            )}
            {isEditing ? (
              <input type="text" value={profileData.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)} className={`text-sm mb-3 w-full p-2 rounded-xl border focus:outline-none focus:border-[#ED128E] ${isDarkMode ? 'bg-[#250918] text-[#A0A0A0] border-[#4A0A2D]' : 'bg-gray-50 text-[#666666] border-gray-300'}`} />
            ) : (
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>{profileData.subtitle}</p>
            )}
            {isEditing ? (
              <textarea value={profileData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} rows={3} className={`mb-6 w-full p-2 rounded-xl border focus:outline-none focus:border-[#ED128E] resize-none ${isDarkMode ? 'bg-[#250918] text-[#E5E5E5] border-[#4A0A2D]' : 'bg-gray-50 text-[#333333] border-gray-300'}`} />
            ) : (
              <p className={`mb-6 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>{profileData.bio}</p>
            )}
            <div className="flex gap-8">
              {[
                { value: posts.length.toString(), label: 'Publicaciones' },
                { value: '152', label: 'Conexiones' },
                { value: '5', label: 'Artículos en Mercado' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}>{stat.value}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className={`rounded-2xl mb-6 border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
          <div className={`flex flex-wrap border-b ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
            {[
              { key: 'publicaciones', icon: FileText, label: 'Mis Publicaciones' },
              { key: 'mercado', icon: ShoppingBag, label: 'Mis Artículos' },
              { key: 'fotos', icon: ImageIcon, label: 'Fotos' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-4 font-medium transition-colors text-sm sm:text-base ${
                  activeTab === key
                    ? isDarkMode ? 'text-white border-b-2 border-[#750946]' : 'text-[#750946] border-b-2 border-[#750946]'
                    : isDarkMode ? 'text-[#A0A0A0] hover:text-[#E5E5E5] hover:bg-[#2D0418]' : 'text-[#666666] hover:text-[#750946] hover:bg-[#FDE7F4]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'publicaciones' && (
          <div className="space-y-6">
            
            {/* --- CAJA PARA CREAR NUEVA PUBLICACIÓN --- */}
            <div className={`rounded-2xl p-4 border shadow-sm ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-4">
                  <img src={profileData.profileImage} alt="User" className="w-12 h-12 rounded-full object-cover border border-[#ED128E]/30" />
                  <div className="flex-1">
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder={`¿Qué nos quieres contar de ${profileData.destino.replace(/[^\w\s]/gi, '').trim()}, ${profileData.name.split(' ')[0]}?`}
                      className={`w-full bg-transparent border-none resize-none focus:ring-0 p-2 text-base ${isDarkMode ? 'text-white placeholder-[#A0A0A0]' : 'text-[#333333] placeholder-[#666666]'}`}
                      rows={2}
                    />
                    
                    {/* VISTA PREVIA DE LA IMAGEN A PUBLICAR */}
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
                <div className={`flex justify-between items-center mt-4 pt-3 border-t ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
                  {/* BOTÓN CONECTADO AL INPUT OCULTO */}
                  <button 
                    type="button" 
                    onClick={() => postImageInputRef.current?.click()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#ED128E]' : 'text-[#666666] hover:bg-[#FDE7F4] hover:text-[#750946]'}`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Añadir foto</span>
                  </button>
                  <button 
                    type="submit" 
                    disabled={newPostText.trim() === '' && !newPostImage}
                    className="flex items-center gap-2 bg-[#ED128E] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#c90d76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Publicar
                  </button>
                </div>
              </form>
            </div>
            {/* ------------------------------------------ */}

            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                {...post} 
                // MAGIA: Forzamos a que todas las publicaciones usen tu nombre y foto actual
                username={profileData.name} 
                profileImage={profileData.profileImage}
                isDarkMode={isDarkMode} 
                // Le pasamos a la tarjeta el poder de eliminarse a sí misma
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'mercado' && (
          <div className={`rounded-2xl p-8 text-center border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
            <ShoppingBag className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#FABDDF]'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>No hay artículos en venta</h3>
            <p className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}>Tus artículos publicados en el mercado aparecerán aquí</p>
          </div>
        )}

        {activeTab === 'fotos' && (
          <div className={`rounded-2xl p-8 text-center border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
            <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#FABDDF]'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>Galería de fotos</h3>
            <p className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}>Tus fotos compartidas aparecerán aquí</p>
          </div>
        )}
      </div>

      {/* Right Sidebar - Mobility Info */}
      <aside className="w-full lg:w-80 lg:sticky top-20 h-fit">
        <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>Información de Movilidad</h2>
          </div>
          <div className="space-y-4">
            {mobilityInfo.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#750946] mt-1">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>{item.label}</div>
                  {isEditing ? (
                    <input type="text" value={item.value} onChange={(e) => handleInputChange(item.id, e.target.value)} className={`text-sm w-full p-1.5 rounded-xl border focus:outline-none focus:border-[#ED128E] ${isDarkMode ? 'bg-[#250918] text-[#A0A0A0] border-[#4A0A2D]' : 'bg-gray-50 text-[#666666] border-gray-300'}`} />
                  ) : (
                    <div className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}