import { MapPin, GraduationCap, BookOpen, Calendar, ImageIcon, ShoppingBag, FileText } from 'lucide-react';
import { PostCard } from './PostCard';
import { useState } from 'react';

interface ProfileViewProps {
  isDarkMode: boolean;
}

const userPosts = [
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

const mobilityInfo = [
  { icon: GraduationCap, label: 'Escuela de origen', value: 'ESCOM-IPN' },
  { icon: BookOpen, label: 'Carrera', value: 'ISC' },
  { icon: Calendar, label: 'Semestre actual', value: '6to' },
  { icon: MapPin, label: 'País de destino', value: 'Corea del Sur 🇰🇷' },
];

export function ProfileView({ isDarkMode }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('publicaciones');

  return (
    <div className="flex gap-6 p-6">
      {/* Main Content Area */}
      <div className="flex-1">
        {/* Profile Header Card */}
        <div className={`rounded-2xl overflow-hidden mb-6 border ${
          isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
        }`}>
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1723174391648-9e73f8865a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc3ODU1Mzc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-16 left-8">
              <img
                src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#750946]"
              />
            </div>
          </div>

          <div className="pt-20 px-8 pb-6">
            <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              Sarah Johnson
            </h1>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
              Estudiante de ESCOM - IPN | Movilidad en Seúl, Corea del Sur 🇰🇷
            </p>
            <p className={`mb-6 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>
              Apasionada por la ingeniería y los viajes. Actualmente en intercambio académico. ¡Contáctame si necesitas tips sobre Seúl!
            </p>

            <div className="flex gap-8">
              {[
                { value: '24', label: 'Publicaciones' },
                { value: '152', label: 'Conexiones' },
                { value: '5', label: 'Artículos en Mercado' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#750946]'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className={`rounded-2xl mb-6 border ${
          isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
        }`}>
          <div className={`flex border-b ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
            {[
              { key: 'publicaciones', icon: FileText, label: 'Mis Publicaciones' },
              { key: 'mercado', icon: ShoppingBag, label: 'Mis Artículos (Mercado)' },
              { key: 'fotos', icon: ImageIcon, label: 'Fotos' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === key
                    ? isDarkMode
                      ? 'text-white border-b-2 border-[#750946]'
                      : 'text-[#750946] border-b-2 border-[#750946]'
                    : isDarkMode
                      ? 'text-[#A0A0A0] hover:text-[#E5E5E5] hover:bg-[#2D0418]'
                      : 'text-[#666666] hover:text-[#750946] hover:bg-[#FDE7F4]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'publicaciones' && (
          <div className="space-y-6">
            {userPosts.map((post) => (
              <PostCard key={post.id} {...post} isDarkMode={isDarkMode} />
            ))}
          </div>
        )}

        {activeTab === 'mercado' && (
          <div className={`rounded-2xl p-8 text-center border ${
            isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
          }`}>
            <ShoppingBag className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#FABDDF]'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              No hay artículos en venta
            </h3>
            <p className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}>
              Tus artículos publicados en el mercado aparecerán aquí
            </p>
          </div>
        )}

        {activeTab === 'fotos' && (
          <div className={`rounded-2xl p-8 text-center border ${
            isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
          }`}>
            <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#FABDDF]'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
              Galería de fotos
            </h3>
            <p className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}>
              Tus fotos compartidas aparecerán aquí
            </p>
          </div>
        )}
      </div>

      {/* Right Sidebar - Mobility Info */}
      <aside className="w-80 sticky top-20 h-fit">
        <div className={`rounded-2xl p-6 border ${
          isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
        }`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            Información de Movilidad
          </h2>
          <div className="space-y-4">
            {mobilityInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#750946]">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>
                    {item.label}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
