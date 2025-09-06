'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const clothingProducts = [
  { id: 302, name: 'Puma Joggers light', description: 'Grey joggers with a sleek fit and side pockets. Perfect for running errands or hitting the gym.', price: 30.49, originalPrice: 45.00, discount: '32%', rating: 4.5, image: '/New_folder/puma_joggers1.jpg', category: "jogger" },
  { id: 307, name: 'Puma ultra Hoodie', description: 'Full-ultra hoodie with front pockets. Designed for both performance and casual wear.', price: 45.00, originalPrice: 65.00, discount: '31%', rating: 4.7, image: '/New_folder/puma_hoddy3.jpg', category: "hoodie" },
  { id: 304, name: 'Casual Puma Joggers', description: 'Casual wear joggers with soft cotton lining. Great for lounging at home or daily casual looks.', price: 29.99, originalPrice: 40.00, discount: '25%', rating: 4.4, image: '/New_folder/puma_joggers3.webp', category: "jogger" },
  { id: 305, name: 'Puma Hoodie ', description: 'Navy blue hoodie with soft fleece interior. Offers a relaxed fit and adjustable drawstring hood.', price: 43.99, originalPrice: 60.00, discount: '27%', rating: 4.6, image: '/New_folder/puma_hoody1.jpg', category: "hoodie" },
  { id: 306, name: 'Puma Classic Hoodie', description: 'Classic pullover hoodie with ribbed cuffs. Ideal for layering during winter or chilly evenings.', price: 41.50, originalPrice: 58.00, discount: '28%', rating: 4.3, image: '/New_folder/puma_hoody2.jpg', category: "hoodie" },
  { id: 301, name: 'Puma Joggers ', description: 'Stylish black joggers ideal for everyday comfort. Stretchable and breathable fabric ensures all-day wearability.', price: 32.99, originalPrice: 50.00, discount: '34%', rating: 4.8, image: '/New_folder/puma_joggers.webp', category: "jogger" },
  { id: 303, name: 'Puma Track Joggers', description: 'Athletic joggers with moisture-wicking material. Best for workouts and active days outdoors.', price: 33.99, originalPrice: 48.00, discount: '29%', rating: 4.9, image: '/New_folder/puma_joggers2.webp', category: "jogger" },
  { id: 308, name: 'Lightweight Puma Hoodie', description: 'Light hoodie perfect for transitional weather. Blends comfort and mobility for daily use.', price: 39.99, originalPrice: 55.00, discount: '27%', rating: 4.5, image: '/New_folder/puma_hoddy4.jpg', category: "hoodie" },
];

const sizes = ['S', 'M', 'L', 'XL'];

// Function to calculate the adjusted price and original price based on size
const getAdjustedPrices = (basePrice, baseOriginalPrice, size) => {
  let price = basePrice;
  let originalPrice = baseOriginalPrice;

  // Increase both prices by 10% for Large size
  if (size === 'L') {
    price = basePrice * 1.10;
    originalPrice = baseOriginalPrice * 1.10;
  }
   else if(size==="S"){
    price=basePrice/1.10;
    originalPrice=baseOriginalPrice/1.10;
  }
  else if (size === 'XL') {
      price = basePrice * 1.15; 
      originalPrice = baseOriginalPrice * 1.15;
  }

  return { price, originalPrice };
};

export default function ClothingPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
     toast.success("item added to cart")
    const size = selectedSizes[product.id] || 'M';
    const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, size);
    const updatedProduct = { ...product, size, price, originalPrice };
    const updated = [...cartItems, updatedProduct];
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const buyNow = (product) => {
    if (!session) {
      alert("Login required");
      router.push("/login");
    } else {
      const size = selectedSizes[product.id] || 'M';
      const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, size);
      const updatedProduct = { ...product, size, price, originalPrice };
      localStorage.setItem('cart', JSON.stringify([updatedProduct]));
      router.push('/checkout');
    }
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const filteredProducts =
    filter === 'all'
      ? clothingProducts
      : clothingProducts.filter((product) => product.category === filter);

  return (
    <div
      className="h-full min-h-screen mt-[65px] bg-[#f0f2f5] pt-[70px] w-full px-4"
      style={{ backgroundImage: "url('/New_folder/clothing.png')" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 font-bold text-black w-fit mx-auto mb-6 shadow">
        Latest PUMA Products
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {['all', 'hoodie', 'jogger'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${
              filter === cat
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300'
            } hover:bg-orange-500 hover:text-white transition`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center items-start gap-6 pb-24">
        {filteredProducts.map((product) => {
          const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, selectedSizes[product.id] || 'M');
          return (
            <div
              key={product.id}
              className="bg-white w-[95%] sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center hover:shadow-xl cursor-pointer flex flex-col transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[220px] object-cover rounded-md mb-4"
                onClick={() => router.push(`/product/${product.id}`)}
              />
              <h3 
                className="text-lg sm:text-xl font-semibold text-gray-800"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              
              {/* Price, Discount, and Rating */}
              <div className="flex flex-col items-center mt-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-bold text-lg sm:text-xl">${price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
                  <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
                </div>
                <div className="flex justify-center text-yellow-400 mt-1">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
              </div>

              {/* Size Selection Buttons */}
              <div className="mt-3 text-center">
                <label className="block text-lg font-semibold text-[#1e263b] mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap justify-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-12 w-12 border-2 rounded-lg font-medium transition-all duration-300 ${
                        (selectedSizes[product.id] || 'M') === size
                          ? 'bg-[#1e263b] text-white border-[#1e263b]'
                          : 'bg-white text-[#1e263b] border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSizeChange(product.id, size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <button
                  className="bg-[#1e263b] text-white px-4 py-2 rounded-md hover:bg-[#334166] transition text-sm flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-orange-600 transition text-sm flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    buyNow(product);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:bg-orange-600"
        onClick={() => router.push('/cart')}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  );
}
