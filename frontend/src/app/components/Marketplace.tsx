import { Plus, MapPin, X, Image as ImageIcon, MessageCircle, Tag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// 1. Añadimos onNavigateToChat a las propiedades
interface MarketplaceProps {
  isDarkMode: boolean;
  onNavigateToChat: (boleta: string) => void; 
}

const categories = ['Todo', 'Electrónica', 'Ropa de Invierno', 'Hogar', 'Gratis / Donaciones'];

// 2. Recibimos onNavigateToChat
export function Marketplace({ isDarkMode, onNavigateToChat }: MarketplaceProps) {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todo');

  // Datos del vendedor actual
  const [sellerInfo, setSellerInfo] = useState({
    boleta: '', name: 'Usuario', img: 'https://placehold.co/100x100/18020E/A0A0A0?text=U'
  });

  const [showSellModal, setShowSellModal] = useState(false);
  const [newItemData, setNewItemData] = useState({
    title: '', price: '', location: '', category: 'Electrónica', description: ''
  });
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // CARGAR DATOS DEL VENDEDOR Y DEL MERCADO AL ENTRAR
  useEffect(() => {
    const boleta = localStorage.getItem("boleta");
    if (boleta) {
      // Cargar mis datos para saber quién vende
      fetch(`http://localhost:8000/api/usuarios/${boleta}`)
        .then(res => res.json())
        .then(data => {
          if (!data.detail) {
            setSellerInfo({
              boleta: boleta,
              name: data.nombre.split(' ')[0],
              img: data.foto_perfil || 'https://placehold.co/100x100/18020E/A0A0A0?text=U'
            });
          }
        });
    }
    cargarMercado();
  }, []);

  const cargarMercado = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/market/todos");
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error("Error al cargar el mercado:", err);
    }
  };

  // SUBIR LA FOTO DEL ARTÍCULO FÍSICAMENTE
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/market/upload-image", {
        method: "POST", body: formData,
      });
      const data = await res.json();
      if (data.status === "success") setNewItemImage(data.url);
    } catch (error) {
      console.error("Error subiendo foto:", error);
    }
  };

  // GUARDAR EL ARTÍCULO EN LA BASE DE DATOS
  const handleSellItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemData.title || !newItemData.location) return;

    try {
      const res = await fetch("http://localhost:8000/api/market/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newItemData.title,
          location: newItemData.location,
          price: newItemData.price || 'Gratis',
          category: newItemData.category,
          description: newItemData.description || 'Sin descripción detallada.',
          image: newItemImage || 'https://placehold.co/800x800/18020E/A0A0A0?text=Sin+Imagen',
          seller_boleta: sellerInfo.boleta,
          seller_name: sellerInfo.name,
          seller_img: sellerInfo.img
        })
      });

      if (res.ok) {
        cargarMercado(); // Recargamos para ver el producto nuevo
        setShowSellModal(false);
        setNewItemData({ title: '', price: '', location: '', category: 'Electrónica', description: '' });
        setNewItemImage(null);
      }
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  };

  // 3. LA FUNCIÓN QUE SE COMUNICA CON APP.TSX
  const manejarContacto = (articulo: any) => {
    if (articulo.seller_boleta === sellerInfo.boleta) {
      alert("Este es tu propio artículo.");
      return;
    }
    
    // Le manda la instrucción a App.tsx para cambiar de pestaña
    onNavigateToChat(articulo.seller_boleta);
  };

  const filteredItems = activeCategory === 'Todo' ? items : items.filter(item => item.category === activeCategory);

  return (
    <div className="p-6 font-sans">
      
      {/* HEADER Y FILTROS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className={`flex flex-wrap gap-3 p-1.5 rounded-full`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#750946] text-white'
                  : isDarkMode 
                    ? 'bg-[#18020E] text-[#A0A0A0] hover:text-white border border-[#2D0418]' 
                    : 'bg-white text-[#750946] border border-[#F0D0E0] hover:bg-[#FDE7F4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowSellModal(true)}
          className="flex items-center justify-center gap-2 bg-[#750946] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#5a0635] transition-transform hover:scale-105 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Vender artículo
        </button>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className={`col-span-full text-center py-10 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            No hay artículos publicados en esta categoría aún.
          </div>
        ) : (
          filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className={`rounded-2xl overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col ${
                isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
              }`}
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover bg-[#1a0310]" />
                <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm ${
                  item.price.toLowerCase() === 'gratis' 
                    ? 'bg-green-500 text-white' 
                    : isDarkMode ? 'bg-black/70 text-white backdrop-blur-sm' : 'bg-white text-gray-800'
                }`}>
                  {item.price}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className={`text-lg font-bold mb-2 truncate ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                  {item.title}
                </h3>
                <div className={`flex items-center gap-1 text-sm mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                
                <div className={`mt-auto pt-4 flex items-center justify-between border-t ${isDarkMode ? 'border-[#2D0418]' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <img src={item.seller_img} alt={item.seller_name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 bg-[#18020E]" />
                    <span className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.seller_name}
                    </span>
                  </div>
                  {/* BOTÓN CONTACTAR EN LA TARJETA */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      manejarContacto(item);
                    }} 
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex-shrink-0 ${
                      isDarkMode ? 'bg-[#750946] text-white hover:bg-[#ED128E]' : 'bg-[#750946] text-white hover:bg-[#900b56]'
                    }`}
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- MODAL PARA VER DETALLES DEL ARTÍCULO --- */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)} 
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${
              isDarkMode ? 'bg-[#18020E] border border-[#2D0418]' : 'bg-white border border-gray-200'
            }`}
          >
            <button 
              onClick={() => setSelectedItem(null)} 
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#1a0310] relative flex items-center justify-center">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
              />
              <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-xl font-bold text-lg shadow-lg ${
                selectedItem.price.toLowerCase() === 'gratis' ? 'bg-green-500 text-white' : 'bg-white text-black'
              }`}>
                {selectedItem.price}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-2">
                <Tag className={`w-4 h-4 ${isDarkMode ? 'text-[#ED128E]' : 'text-[#750946]'}`} />
                <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#ED128E]' : 'text-[#750946]'}`}>
                  {selectedItem.category}
                </span>
              </div>
              
              <h2 className={`text-3xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                {selectedItem.title}
              </h2>
              
              <div className={`flex items-center gap-2 mb-6 text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                <MapPin className="w-5 h-5" />
                <span>Ubicación: {selectedItem.location}</span>
              </div>

              <div className="mb-8">
                <h3 className={`text-sm font-bold uppercase mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Descripción
                </h3>
                <p className={`leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-[#E5E5E5]' : 'text-gray-700'}`}>
                  {selectedItem.description}
                </p>
              </div>

              <div className={`mt-auto pt-6 border-t ${isDarkMode ? 'border-[#2D0418]' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedItem.seller_img} alt={selectedItem.seller_name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-[#18020E]" />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Publicado por</p>
                      <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{selectedItem.seller_name}</p>
                    </div>
                  </div>
                </div>

                {/* BOTÓN CONTACTAR EN EL MODAL */}
                <button 
                  onClick={() => manejarContacto(selectedItem)}
                  className="w-full flex items-center justify-center gap-2 bg-[#750946] text-white py-4 rounded-xl font-bold hover:bg-[#5a0635] transition-colors shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar mensaje al vendedor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PARA VENDER ARTÍCULO --- */}
      {showSellModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-[#18020E] border border-[#2D0418]' : 'bg-white border border-gray-200'
          }`}>
            <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-[#2D0418]' : 'border-gray-100'}`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>Nuevo Artículo</h3>
              <button onClick={() => setShowSellModal(false)} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2D0418] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSellItem} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              
              <div onClick={() => fileInputRef.current?.click()} className={`w-full h-40 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed transition-colors ${
                  isDarkMode ? 'border-[#4A0A2D] bg-[#1a0310] hover:bg-[#2D0418]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                }`}>
                {newItemImage ? (
                  <img src={newItemImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className={`p-3 rounded-full mb-2 ${isDarkMode ? 'bg-[#2D0418] text-[#750946]' : 'bg-[#FDE7F4] text-[#750946]'}`}>
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>Subir foto del artículo</span>
                  </>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>¿Qué vendes?</label>
                <input type="text" required placeholder="Ej. Bicicleta de montaña" value={newItemData.title} onChange={(e) => setNewItemData({...newItemData, title: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#750946]/50 transition-colors ${isDarkMode ? 'bg-[#2D0418] border-transparent text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Categoría</label>
                  <select value={newItemData.category} onChange={(e) => setNewItemData({...newItemData, category: e.target.value})}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors ${isDarkMode ? 'bg-[#2D0418] border-transparent text-white' : 'bg-white border-gray-300 text-black'}`}>
                    {categories.filter(c => c !== 'Todo').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Precio</label>
                  <input type="text" placeholder="Ej. $500 MXN o Gratis" value={newItemData.price} onChange={(e) => setNewItemData({...newItemData, price: e.target.value})}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#750946]/50 transition-colors ${isDarkMode ? 'bg-[#2D0418] border-transparent text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ubicación</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" required placeholder="Ej. ESCOM, CDMX" value={newItemData.location} onChange={(e) => setNewItemData({...newItemData, location: e.target.value})}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#750946]/50 transition-colors ${isDarkMode ? 'bg-[#2D0418] border-transparent text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Descripción (Opcional)</label>
                <textarea rows={3} placeholder="Detalla el estado del artículo..." value={newItemData.description} onChange={(e) => setNewItemData({...newItemData, description: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#750946]/50 transition-colors resize-none ${isDarkMode ? 'bg-[#2D0418] border-transparent text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black'}`}
                />
              </div>

              <button type="submit" className="w-full mt-4 bg-[#750946] text-white py-3.5 rounded-xl font-bold hover:bg-[#5a0635] transition-colors shadow-lg">
                Publicar en el Mercado
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}