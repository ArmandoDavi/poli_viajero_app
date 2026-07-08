import { useState } from 'react';
import { MapPin, Star, UtensilsCrossed, Info, X, Map } from 'lucide-react';

interface RestaurantsViewProps {
  isDarkMode: boolean;
}

// Catálogo simulado de recomendaciones
const RECOMENDACIONES = [
  {
    id: 1,
    nombre: "Chocolatería San Ginés",
    pais: "España",
    bandera: "🇪🇸",
    ubicacion: "Pasadizo de San Ginés 5, Madrid",
    descripcion: "Un clásico imperdible. Abierto las 24 horas, ideal para comer el tradicional chocolate con churros después de una noche de fiesta o estudio. Suele haber fila, pero avanza rápido.",
    calificacion: 5,
    imagen: "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=800&auto=format&fit=crop",
    tipo: "Cafetería / Postres",
    precio: "€"
  },
  {
    id: 2,
    nombre: "Myeongdong Kyoja",
    pais: "Corea del Sur",
    bandera: "🇰🇷",
    ubicacion: "29 Myeongdong 10-gil, Jung-gu, Seúl",
    descripcion: "Famoso por su Kalguksu (fideos cortados a cuchillo) y mandu (empanadas). Económico, rápido y tiene estrella Michelin. Ideal para estudiantes que buscan comida reconfortante.",
    calificacion: 4.5,
    imagen: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=800&auto=format&fit=crop",
    tipo: "Restaurante Local",
    precio: "₩₩"
  },
  {
    id: 3,
    nombre: "Fogo de Chão (Jardins)",
    pais: "Brasil",
    bandera: "🇧🇷",
    ubicacion: "Rua Augusta, 2077 - Cerqueira César, São Paulo",
    descripcion: "Si quieres darte un lujo y probar el verdadero churrasco brasileño. Espadas de carne ilimitadas y una barra de ensaladas enorme. Guarda espacio para la picanha.",
    calificacion: 5,
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    tipo: "Churrascaría",
    precio: "R$R$R$"
  },
  {
    id: 4,
    nombre: "La Puerta Falsa",
    pais: "Colombia",
    bandera: "🇨🇴",
    ubicacion: "Calle 11 # 6-50, La Candelaria, Bogotá",
    descripcion: "El restaurante más antiguo de Bogotá. Perfecto para probar el ajiaco santafereño, tamales y chocolate con queso. Muy tradicional y acogedor.",
    calificacion: 4,
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    tipo: "Comida Tradicional",
    precio: "$$"
  },
  {
    id: 5,
    nombre: "Fonda La Chiquita",
    pais: "México",
    bandera: "🇲🇽",
    ubicacion: "Cerca de ESCOM, Zacatenco, CDMX",
    descripcion: "La fondita de confianza de los politécnicos. Comida corrida con las 3 B (Bueno, Bonito y Barato). Menú de 4 tiempos por $60 MXN. Las pechugas empanizadas son la especialidad.",
    calificacion: 4.5,
    imagen: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=800&auto=format&fit=crop",
    tipo: "Fonda Económica",
    precio: "$"
  },
  {
    id: 6,
    nombre: "Mercado de San Miguel",
    pais: "España",
    bandera: "🇪🇸",
    ubicacion: "Plaza de San Miguel, Madrid",
    descripcion: "Más que un restaurante, es un mercado gastronómico. Perfecto para ir con amigos y probar diferentes tapas, paellas y bebidas en un ambiente animado.",
    calificacion: 4,
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    tipo: "Mercado Gastronómico",
    precio: "€€"
  }
];

const FILTROS = ["Todos", "España", "Corea del Sur", "Brasil", "Colombia", "México"];

export function RestaurantsView({ isDarkMode }: RestaurantsViewProps) {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  // --- NUEVO: Estado para saber qué restaurante se abrió en el modal ---
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState<typeof RECOMENDACIONES[0] | null>(null);

  const restaurantesFiltrados = filtroActivo === "Todos" 
    ? RECOMENDACIONES 
    : RECOMENDACIONES.filter(r => r.pais === filtroActivo);

  const renderEstrellas = (calificacion: number) => {
    const estrellas = [];
    const estrellasCompletas = Math.floor(calificacion);
    const tieneMediaEstrella = calificacion % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < estrellasCompletas) {
        estrellas.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === estrellasCompletas && tieneMediaEstrella) {
        estrellas.push(<Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        estrellas.push(<Star key={i} className="w-4 h-4 text-gray-400" />);
      }
    }
    return estrellas;
  };

  return (
    <div className="p-6 font-sans relative">
      
      {/* HEADER Y FILTROS */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
          <UtensilsCrossed className="w-8 h-8 text-[#ED128E]" />
          Guía Gastronómica
        </h1>
        <p className={`mb-6 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
          Descubre los mejores lugares para comer recomendados por otros estudiantes de movilidad.
        </p>

        <div className="flex flex-wrap gap-3">
          {FILTROS.map(filtro => (
            <button
              key={filtro}
              onClick={() => setFiltroActivo(filtro)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filtroActivo === filtro
                  ? 'bg-[#750946] text-white shadow-md scale-105'
                  : isDarkMode 
                    ? 'bg-[#18020E] text-[#A0A0A0] hover:text-white border border-[#2D0418] hover:bg-[#2D0418]' 
                    : 'bg-white text-[#750946] border border-[#F0D0E0] hover:bg-[#FDE7F4]'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE RESTAURANTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {restaurantesFiltrados.map((restaurante) => (
          <div 
            key={restaurante.id} 
            // --- NUEVO: Agregamos el onClick y cursor-pointer ---
            onClick={() => setRestauranteSeleccionado(restaurante)}
            className={`rounded-3xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col ${
              isDarkMode ? 'bg-[#18020E] border-[#2D0418] hover:border-[#ED128E]/50' : 'bg-white border-[#F0D0E0] hover:border-[#750946]/30'
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={restaurante.imagen} 
                alt={restaurante.nombre} 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" 
              />
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md backdrop-blur-md ${
                isDarkMode ? 'bg-black/60 text-white' : 'bg-white/90 text-[#750946]'
              }`}>
                {restaurante.bandera} {restaurante.pais}
              </div>
              <div className="absolute top-4 right-4 bg-[#ED128E] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                {restaurante.tipo}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className={`text-xl font-bold leading-tight mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                {restaurante.nombre}
              </h3>
              
              <div className="flex items-center gap-1 mb-4">
                {renderEstrellas(restaurante.calificacion)}
                <span className={`text-sm ml-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {restaurante.calificacion} / 5
                </span>
              </div>

              <div className={`flex items-start gap-2 text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#750946]" />
                <span className="truncate">{restaurante.ubicacion}</span>
              </div>

              <div className={`text-sm mt-auto pt-4 border-t ${
                isDarkMode ? 'border-[#2D0418] text-[#ED128E]' : 'border-[#F0C8DF] text-[#750946]'
              } font-semibold flex items-center justify-between`}>
                <span>Click para ver más detalles</span>
                <span>{restaurante.precio}</span>
              </div>
            </div>
          </div>
        ))}
        
        {restaurantesFiltrados.length === 0 && (
          <div className={`col-span-full text-center py-20 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            Aún no hay recomendaciones para este país. ¡Sé el primero en compartir tu lugar favorito!
          </div>
        )}
      </div>

      {/* --- NUEVO: MODAL DE DETALLES --- */}
      {restauranteSeleccionado && (
        <div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setRestauranteSeleccionado(null)} // Cierra al hacer clic afuera
        >
          <div 
            className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border ${
              isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
            }`}
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
          >
            {/* Botón de cerrar */}
            <button
              onClick={() => setRestauranteSeleccionado(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagen grande en el modal */}
            <div className="relative h-64 sm:h-80 flex-shrink-0">
              <img 
                src={restauranteSeleccionado.imagen} 
                alt={restauranteSeleccionado.nombre} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#ED128E] px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    {restauranteSeleccionado.tipo}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    {restauranteSeleccionado.bandera} {restauranteSeleccionado.pais}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-1">{restauranteSeleccionado.nombre}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderEstrellas(restauranteSeleccionado.calificacion)}</div>
                  <span className="text-sm font-medium">({restauranteSeleccionado.calificacion} de 5)</span>
                </div>
              </div>
            </div>

            {/* Cuerpo del modal con scroll si es muy largo */}
            <div className="p-6 overflow-y-auto">
              
              <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 ${
                isDarkMode ? 'bg-[#2D0418] text-[#E5E5E5]' : 'bg-[#FDE7F4] text-[#750946]'
              }`}>
                <Info className="w-6 h-6 flex-shrink-0 text-[#ED128E]" />
                <p className="leading-relaxed text-sm md:text-base">
                  {restauranteSeleccionado.descripcion}
                </p>
              </div>

              <div className={`flex flex-col gap-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#750946]" />
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-70">Ubicación</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                      {restauranteSeleccionado.ubicacion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-[#750946]" />
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-70">Rango de precio</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                      {restauranteSeleccionado.precio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón de acción (simulado) */}
              <button className="w-full mt-8 flex items-center justify-center gap-2 bg-[#750946] text-white font-bold py-3.5 rounded-xl hover:bg-[#5a0635] transition-colors shadow-md">
                <Map className="w-5 h-5" />
                Abrir en Maps
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}