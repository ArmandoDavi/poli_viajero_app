import { ProductCard } from './ProductCard';
import { useState } from 'react';

interface MarketplaceProps {
  isDarkMode: boolean;
}

const categories = ['Todo', 'Electrónica', 'Ropa de Invierno', 'Hogar', 'Gratis / Donaciones'];

const products = [
  { id: 1, image: 'https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzc4MTY2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Tablet y accesorios', price: '€120', isFree: false, location: 'Berlín', country: 'Alemania', countryFlag: '🇩🇪', sellerImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'Anna Schmidt' },
  { id: 2, image: 'https://images.unsplash.com/photo-1548712370-806c729f72ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBjb2F0fGVufDF8fHx8MTc3ODE4NDE2NHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Chamarra térmica de invierno', price: '€45', isFree: false, location: 'Oslo', country: 'Noruega', countryFlag: '🇳🇴', sellerImage: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'Erik Hansen' },
  { id: 3, image: 'https://images.unsplash.com/photo-1617364852223-75f57e78dc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZnVybml0dXJlJTIwZGVjb3J8ZW58MXx8fHwxNzc4MDc3NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Sillón moderno', price: '€85', isFree: false, location: 'Barcelona', country: 'España', countryFlag: '🇪🇸', sellerImage: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTI5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'Carlos Ruiz' },
  { id: 4, image: 'https://images.unsplash.com/photo-1760533091973-1262bf57d244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3aW50ZXIlMjBqYWNrZXQlMjBjb2F0fGVufDF8fHx8MTc3ODE4NDE2NHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Chaquetas de cuero', price: null, isFree: true, location: 'París', country: 'Francia', countryFlag: '🇫🇷', sellerImage: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'Marie Dupont' },
  { id: 5, image: 'https://images.unsplash.com/photo-1485813035871-b009e6cb0f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3aW50ZXIlMjBqYWNrZXQlMjBjb2F0fGVufDF8fHx8MTc3ODE4NDE2NHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Parka con capucha', price: '$75', isFree: false, location: 'Toronto', country: 'Canadá', countryFlag: '🇨🇦', sellerImage: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NjIzMjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'James Wilson' },
  { id: 6, image: 'https://images.unsplash.com/photo-1768837951109-eb1f82e6f491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxob21lJTIwZnVybml0dXJlJTIwZGVjb3J8ZW58MXx8fHwxNzc4MDc3NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Sillas amarillas modernas', price: null, isFree: true, location: 'Ámsterdam', country: 'Países Bajos', countryFlag: '🇳🇱', sellerImage: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjE4MDE2OHww&ixlib=rb-4.1.0&q=80&w=1080', sellerName: 'Sophie van Dijk' },
];

export function Marketplace({ isDarkMode }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  return (
    <div className="w-full">
      {/* Category Filter Bar */}
      <div className={`sticky top-16 z-40 px-6 py-4 border-b ${
        isDarkMode
          ? 'bg-[#18020E] border-[#2D0418]'
          : 'bg-white border-[#F0D0E0]'
      }`}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#750946] text-white'
                  : isDarkMode
                    ? 'bg-[#2D0418] text-[#E5E5E5] hover:bg-[#3D0522] border border-[#3D0522]'
                    : 'bg-[#FDE7F4] text-[#750946] hover:bg-[#FABDDF] border border-[#F0C8DF]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
}
