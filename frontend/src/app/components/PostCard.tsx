import { Heart, MessageCircle, Share2, Send, Trash2 } from 'lucide-react'; // Añadimos Trash2
import { useState } from 'react';

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
  onDelete?: () => void; // NUEVO: Permiso para ser eliminada
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
  onDelete, // NUEVO
}: PostCardProps) {
  
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setCurrentLikes(currentLikes - 1);
      setIsLiked(false);
    } else {
      setCurrentLikes(currentLikes + 1);
      setIsLiked(true);
    }
  };

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState<{id: number, text: string, time: string}[]>([]); 

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const commentToAdd = { id: Date.now(), text: newComment, time: 'Justo ahora' };
    setPostComments([...postComments, commentToAdd]);
    setNewComment("");
  };

  const totalComments = comments + postComments.length;

  return (
    <div className={`rounded-2xl overflow-hidden mb-6 border transition-all ${
      isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
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

        {/* --- NUEVO: BOTÓN DE ELIMINAR --- */}
        {onDelete && (
          <button 
            onClick={onDelete}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-[#A0A0A0] hover:text-red-500 hover:bg-[#2D0418]' : 'text-[#666666] hover:text-red-500 hover:bg-[#FDE7F4]'
            }`}
            title="Eliminar publicación"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Post Text */}
      {postText && (
        <div className="px-4 pb-3">
          <p className={isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}>{postText}</p>
        </div>
      )}

      {/* Post Image */}
      {postImage && (
        <div className="w-full">
          <img src={postImage} alt="Publicación" className="w-full h-96 object-cover" />
        </div>
      )}

      {/* Reactions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
            {currentLikes.toLocaleString()} me gusta
          </span>
          <span className={`text-sm cursor-pointer hover:underline ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}
                onClick={() => setShowComments(!showComments)}>
            {totalComments} comentarios
          </span>
        </div>
        
        <div className={`flex items-center gap-2 border-t pt-3 ${
          isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'
        }`}>
          {/* Botones de acción */}
          <button onClick={handleLike} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'}`}>
            <Heart className={`w-5 h-5 transition-all ${isLiked ? 'text-[#ED128E] fill-[#ED128E]' : isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#ED128E] group-hover:fill-[#ED128E]' : 'text-[#666666] group-hover:text-[#750946] group-hover:fill-[#750946]'}`} />
            <span className={`font-medium ${isLiked ? 'text-[#ED128E]' : isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'}`}>Me gusta</span>
          </button>
          
          <button onClick={() => setShowComments(!showComments)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'}`}>
            <MessageCircle className={`w-5 h-5 transition-colors ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'}`} />
            <span className={`font-medium ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'}`}>Comentar</span>
          </button>

          <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-colors group ${isDarkMode ? 'hover:bg-[#2D0418]' : 'hover:bg-[#FDE7F4]'}`}>
            <Share2 className={`w-5 h-5 transition-colors ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'}`} />
            <span className={`font-medium ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#E5E5E5]' : 'text-[#666666] group-hover:text-[#750946]'}`}>Compartir</span>
          </button>
        </div>
      </div>

      {/* Comentarios */}
      {showComments && (
        <div className={`p-4 border-t ${isDarkMode ? 'border-[#2D0418] bg-[#1a0310]' : 'border-[#F0D0E0] bg-gray-50'}`}>
          {postComments.length > 0 && (
            <div className="mb-4 space-y-3">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className={`flex-1 rounded-xl p-3 ${isDarkMode ? 'bg-[#2D0418]' : 'bg-white border border-[#F0D0E0]'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>Tú</span>
                      <span className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>{comment.time}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'}`}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Escribe un comentario..." className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none border focus:border-[#ED128E] transition-colors ${isDarkMode ? 'bg-[#2D0418] border-[#4A0A2D] text-white placeholder-[#A0A0A0]' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`} />
            <button type="submit" disabled={newComment.trim() === ""} className="p-2 bg-[#ED128E] text-white rounded-full hover:bg-[#c90d76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}