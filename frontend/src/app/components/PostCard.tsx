import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostCardProps {
  profileImage: string;
  username: string;
  country: string;
  countryFlag: string;
  timePosted: string;
  postText: string;
  postImage: string;
  likes: number;
  comments: number;
  isDarkMode: boolean;
}

export function PostCard({
  profileImage,
  username,
  country,
  countryFlag,
  timePosted,
  postText,
  postImage,
  likes,
  comments,
  isDarkMode,
}: PostCardProps) {
  return (
    <div className={`rounded-2xl overflow-hidden mb-6 border transition-all ${
      isDarkMode
        ? 'bg-[#18020E] border-[#2D0418]'
        : 'bg-white border-[#F0D0E0]'
    }`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt={username}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#750946]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
                {username}
              </span>
              <span className="text-xl">{countryFlag}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'
            }`}>
              <span>{country}</span>
              <span>•</span>
              <span>{timePosted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Text */}
      {postText && (
        <div className="px-4 pb-3">
          <p className={isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}>{postText}</p>
        </div>
      )}

      {/* Post Image */}
      <div className="w-full">
        <img src={postImage} alt="Publicación" className="w-full h-96 object-cover" />
      </div>

      {/* Reactions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            {likes.toLocaleString()} me gusta
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            {comments} comentarios
          </span>
        </div>
        <div className={`flex items-center gap-2 border-t pt-3 ${
          isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'
        }`}>
          <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${
            isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
          }`}>
            <Heart className={`w-5 h-5 transition-all ${
              isDarkMode
                ? 'text-[#A0A0A0] group-hover:text-[#ED128E] group-hover:fill-[#ED128E]'
                : 'text-[#666666] group-hover:text-[#750946] group-hover:fill-[#750946]'
            }`} />
            <span className={`font-medium ${
              isDarkMode
                ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]'
                : 'text-[#666666] group-hover:text-[#750946]'
            }`}>
              Me gusta
            </span>
          </button>
          <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${
            isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
          }`}>
            <MessageCircle className={`w-5 h-5 transition-colors ${
              isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'
            }`} />
            <span className={`font-medium ${
              isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'
            }`}>
              Comentar
            </span>
          </button>
          <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${
            isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'
          }`}>
            <Share2 className={`w-5 h-5 transition-colors ${
              isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'
            }`} />
            <span className={`font-medium ${
              isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'
            }`}>
              Compartir
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
