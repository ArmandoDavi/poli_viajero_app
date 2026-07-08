import { MapPin, GraduationCap, BookOpen, Calendar, ImageIcon, ShoppingBag, FileText, Edit2, Save, X, Camera, Send } from 'lucide-react';
import { PostCard } from './PostCard';
import { useState, useRef, useEffect } from 'react';

interface ProfileViewProps {
  isDarkMode: boolean;
}

// --- LIMPIEZA: Arreglo vacío para empezar sin publicaciones de prueba ---
const initialPosts: any[] = [];

export function ProfileView({ isDarkMode }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('publicaciones');
  
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const postImageInputRef = useRef<HTMLInputElement>(null);

  // --- PERFIL NEUTRAL INICIAL ---
  const [profileData, setProfileData] = useState({
    name: 'Usuario Nuevo',
    subtitle: 'Estudiante',
    bio: 'Aún no hay una biografía disponible. ¡Edita tu perfil para contarnos sobre ti!',
    escuela: '---',
    carrera: '---',
    semestre: '---',
    destino: '---',
    profileImage: 'https://placehold.co/200x200/18020E/A0A0A0?text=Añadir+Foto',
    coverImage: 'https://placehold.co/800x200/18020E/A0A0A0?text=Añadir+Portada'
  });

  // --- LLAMADA REAL A LA BASE DE DATOS ---
  // --- LLAMADA REAL A LA BASE DE DATOS ---
  useEffect(() => {
    const boletaUsuario = localStorage.getItem("boleta");

    if (boletaUsuario) {
      // 1. Cargar la información del perfil
      fetch(`http://localhost:8000/api/usuarios/${boletaUsuario}`)
        .then(response => response.json())
        .then(data => {
          if (!data.detail) {
            setProfileData(prev => ({
              ...prev,
              name: data.nombre,
              destino: data.destino,
              escuela: data.escuela_origen || '---',
              carrera: data.carrera || '---',
              semestre: data.semestre || '---',
              bio: data.biografia || 'Aún no hay una biografía disponible. ¡Edita tu perfil para contarnos sobre ti!',
              profileImage: data.foto_perfil || prev.profileImage,
              coverImage: data.foto_portada || prev.coverImage,
              subtitle: data.descripcion_corta || `Estudiante de ${data.escuela_origen || 'ESCOM - IPN'} | ${data.movilidad} en ${data.destino}`,
            }));
          }
        })
        .catch(error => console.error("Error conectando con la BD:", error));

      // 2. NUEVO: Cargar el historial de publicaciones
      fetch(`http://localhost:8000/api/posts/${boletaUsuario}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Transformamos los datos de Python para que React los entienda
            const postsGuardados = data.map(post => ({
              id: post.id,
              username: post.username,
              profileImage: post.profile_image,
              timePosted: post.time_posted,
              postText: post.post_text,
              postImage: post.post_image,
              country: 'Destino', 
              countryFlag: '🌍',
              likes: post.likes,
              comments: post.comments
            }));
            setPosts(postsGuardados);
          }
        })
        .catch(error => console.error("Error cargando publicaciones:", error));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // --- NUEVA FUNCIÓN QUE SÍ COMUNICA LAS FOTOS A PYTHON ---
  // --- SUBIR IMAGEN FÍSICA AL BACKEND ---
  const handleImageChange = async (field: 'profileImage' | 'coverImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 1. Buscamos la boleta del usuario actual
    const boletaUsuario = localStorage.getItem("boleta");
    if (!boletaUsuario) {
      console.error("No se encontró la boleta del usuario. Inicia sesión de nuevo.");
      return;
    }

    // 2. Preparamos el paquete de la imagen para enviarlo
    const tipoRuta = field === 'profileImage' ? 'perfil' : 'portada';
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log(`Intentando subir imagen de ${tipoRuta}...`);
      
      // 3. Enviamos la petición a nuestro backend FastAPI
      const res = await fetch(`http://localhost:8000/api/perfil/upload-image/${tipoRuta}/${boletaUsuario}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.status === "success") {
        console.log("¡Éxito! URL guardada:", data.url);
        
        // 👇 LA MAGIA AQUÍ: Agregamos "?t=" seguido de la hora exacta en milisegundos 👇
        // Esto rompe la caché del navegador y fuerza el renderizado instantáneo
        const urlFinalConCacheBuster = `${data.url}?t=${Date.now()}`;
        
        setProfileData(prev => ({ ...prev, [field]: urlFinalConCacheBuster }));
      } else {
        console.error("El servidor rechazó la imagen:", data.detail);
      }
    } catch (error) {
      console.error("Error al conectar con Python:", error);
    }
  };

  const handleDeletePost = (postIdToDelete: number) => {
    setPosts(posts.filter(post => post.id !== postIdToDelete));
  };

  const handlePostImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preparamos la imagen en un FormData
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Subiendo archivo físico de la publicación al servidor...");
      
      // Enviamos la foto a la nueva ruta de FastAPI
      const res = await fetch("http://localhost:8000/api/posts/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.status === "success") {
        console.log("¡Imagen de post subida con éxito! URL real:", data.url);
        // Guardamos la URL real del servidor en el estado de la vista previa
        setNewPostImage(data.url);
      } else {
        console.error("El servidor rechazó la imagen del post");
      }
    } catch (error) {
      console.error("Error conectando con la ruta de imágenes de posts:", error);
    }

    if (event.target) event.target.value = '';
  };

  const handleSave = async () => {
    const boletaUsuario = localStorage.getItem("boleta");
    if (!boletaUsuario) return;

    try {
      // Enviamos el paquete con todos los textos al backend
      const res = await fetch("http://localhost:8000/api/perfil/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boleta: boletaUsuario,
          nombre: profileData.name,
          escuela_origen: profileData.escuela,
          carrera: profileData.carrera,
          semestre: profileData.semestre,
          destino: profileData.destino,
          descripcion_corta: profileData.subtitle,
          biografia: profileData.bio,
        }),
      });

  const data = await res.json();

    if (res.ok && data.status === "success") {
        console.log("¡Textos guardados en la base de datos!");
        setIsEditing(false); // Cerramos el modo edición al terminar
      } else {
        console.error("Error del servidor:", data);
      }
    } catch (error) {
      console.error("Error al guardar los textos:", error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim() === '' && !newPostImage) return;

    const boletaUsuario = localStorage.getItem("boleta");
    if (!boletaUsuario) return;

    try {
      // 1. Enviamos los datos del post a Python
      const res = await fetch("http://localhost:8000/api/posts/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boleta_usuario: boletaUsuario,
          username: profileData.name,
          profile_image: profileData.profileImage,
          post_text: newPostText,
          post_image: newPostImage || "" // Por ahora, manejaremos solo texto permanentemente
        })
      });

      if (res.ok) {
        // 2. Si se guardó con éxito, volvemos a descargar la lista actualizada
        const postsRes = await fetch(`http://localhost:8000/api/posts/${boletaUsuario}`);
        const postsData = await postsRes.json();
        
        if (Array.isArray(postsData)) {
          const postsGuardados = postsData.map((post: any) => ({
            id: post.id,
            username: post.username,
            profileImage: post.profile_image,
            timePosted: post.time_posted,
            postText: post.post_text,
            postImage: post.post_image,
            country: profileData.destino !== '---' ? profileData.destino.replace(/[^\w\s]/gi, '').trim() : 'Destino',
            countryFlag: profileData.destino !== '---' ? (profileData.destino.slice(-2) || '🌍') : '🌍',
            likes: post.likes,
            comments: post.comments
          }));
          setPosts(postsGuardados);
        }

        // 3. Limpiamos la caja de texto
        setNewPostText('');
        setNewPostImage(null);
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  const mobilityInfo = [
    { id: 'escuela', icon: GraduationCap, label: 'Escuela de origen', value: profileData.escuela },
    { id: 'carrera', icon: BookOpen, label: 'Carrera', value: profileData.carrera },
    { id: 'semestre', icon: Calendar, label: 'Semestre actual', value: profileData.semestre },
    { id: 'destino', icon: MapPin, label: 'País de destino', value: profileData.destino },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 font-sans">
      <input type="file" ref={profileInputRef} accept="image/*" onChange={(e) => handleImageChange('profileImage', e)} className="hidden" />
      <input type="file" ref={coverInputRef} accept="image/*" onChange={(e) => handleImageChange('coverImage', e)} className="hidden" />
      <input type="file" ref={postImageInputRef} accept="image/*" onChange={handlePostImageChange} className="hidden" />

      <div className="flex-1">
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
              <img src={profileData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-[#750946] relative z-10 bg-[#18020E]" />
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
                { value: '0', label: 'Conexiones' },
                { value: '0', label: 'Artículos en Mercado' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}>{stat.value}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        {activeTab === 'publicaciones' && (
          <div className="space-y-6">
            <div className={`rounded-2xl p-4 border shadow-sm ${isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'}`}>
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-4">
                  <img src={profileData.profileImage} alt="User" className="w-12 h-12 rounded-full object-cover border border-[#ED128E]/30 bg-[#18020E]" />
                  <div className="flex-1">
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder={`¿Qué nos quieres contar, ${profileData.name.split(' ')[0]}?`}
                      className={`w-full bg-transparent border-none resize-none focus:ring-0 p-2 text-base ${isDarkMode ? 'text-white placeholder-[#A0A0A0]' : 'text-[#333333] placeholder-[#666666]'}`}
                      rows={2}
                    />
                    
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
                  <button type="button" onClick={() => postImageInputRef.current?.click()} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0] hover:bg-[#2D0418] hover:text-[#ED128E]' : 'text-[#666666] hover:bg-[#FDE7F4] hover:text-[#750946]'}`}>
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

            {posts.length === 0 ? (
              <div className={`text-center py-10 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
                No hay publicaciones aún. ¡Sé el primero en compartir algo!
              </div>
            ) : (
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  {...post} 
                  username={profileData.name} 
                  profileImage={profileData.profileImage}
                  isDarkMode={isDarkMode} 
                  onDelete={() => handleDeletePost(post.id)}
                />
              ))
            )}
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