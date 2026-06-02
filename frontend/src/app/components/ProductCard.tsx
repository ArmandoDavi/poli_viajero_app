import { MapPin } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string | null;
  isFree?: boolean;
  location: string;
  country: string;
  countryFlag: string;
  sellerImage: string;
  sellerName: string;
  isDarkMode: boolean;
}

export function ProductCard({
  image,
  title,
  price,
  isFree = false,
  location,
  country,
  countryFlag,
  sellerImage,
  sellerName,
  isDarkMode,
}: ProductCardProps) {
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all ${
      isDarkMode
        ? 'bg-[#18020E] border-[#2D0418]'
        : 'bg-white border-[#F0D0E0]'
    }`}>
      {/* Product Image */}
      <div className="relative w-full h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          {isFree ? (
            <span className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-lg text-sm">
              Gratis
            </span>
          ) : (
            <span className={`px-3 py-1.5 font-bold rounded-lg text-sm ${
              isDarkMode ? 'bg-[#18020E]/90 text-white' : 'bg-white/90 text-[#333333]'
            }`}>
              {price}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className={`font-semibold text-lg mb-2 ${
          isDarkMode ? 'text-white' : 'text-[#333333]'
        }`}>
          {title}
        </h3>

        <div className={`flex items-center gap-1.5 mb-3 text-sm ${
          isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'
        }`}>
          <MapPin className="w-4 h-4" />
          <span>{location}, {country}</span>
          <span className="ml-1">{countryFlag}</span>
        </div>

        <div className={`flex items-center justify-between pt-3 border-t ${
          isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'
        }`}>
          <div className="flex items-center gap-2">
            <img
              src={sellerImage}
              alt={sellerName}
              className="w-8 h-8 rounded-full object-cover border-2 border-[#750946]"
            />
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-[#E5E5E5]' : 'text-[#333333]'
            }`}>
              {sellerName}
            </span>
          </div>

          <button className={`px-4 py-1.5 text-white text-sm font-medium rounded-lg transition-colors ${
            isDarkMode ? 'bg-[#750946] hover:bg-[#980B5B]' : 'bg-[#750946] hover:bg-[#420528]'
          }`}>
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
}
