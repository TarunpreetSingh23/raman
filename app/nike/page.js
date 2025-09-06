'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const clothingProducts = [
  {
    id: 701,
    name: 'Nike Men Gym Suit',
    description: 'Breathable gym wear with dry-fit technology. Ideal for intense training and daily workouts.',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25%',
    rating: 4.8,
    image: '/New_folder/nike1.webp',
    category: 'men',
  },
  {
    id: 702,
    name: 'Nike Men Training Set',
    description: 'Includes slim-fit tee and shorts. Flexible and sweat-resistant fabric for full range motion.',
    price: 54.50,
    originalPrice: 70.00,
    discount: '22%',
    rating: 4.5,
    image: '/New_folder/nike2.webp',
    category: 'men',
  },
  {
    id: 705,
    name: 'Nike Woman Gym Suit',
    description: 'Stylish gym wear for active women. Comfortable fit with quick-dry technology.',
    price: 58.90,
    originalPrice: 75.00,
    discount: '21%',
    rating: 4.6,
    image: '/New_folder/nike8.webp',
    category: 'woman',
  },
  {
    id: 706,
    name: 'Nike Woman Workout Set',
    description: 'High-waist leggings with supportive sports bra. Perfect for yoga, running, or gym.',
    price: 61.00,
    originalPrice: 80.00,
    discount: '24%',
    rating: 4.9,
    image: '/New_folder/nike7.webp',
    category: 'woman',
  },
  {
    id: 707,
    name: 'Nike Flex Woman Set',
    description: 'Lightweight and stretchable suit. Gives full mobility and sweat-free comfort.',
    price: 56.49,
    originalPrice: 72.00,
    discount: '21%',
    rating: 4.7,
    image: '/New_folder/nike6.webp',
    category: 'woman',
  },
  {
    id: 708,
    name: 'Nike Woman Gym Tracksuit',
    description: 'Modern tracksuit for high-intensity sessions. Stylish and functional with breathable fabric.',
    price: 60.00,
    originalPrice: 78.00,
    discount: '23%',
    rating: 4.7,
    image: '/New_folder/nike5.webp',
    category: 'woman',
  },
  {
    id: 703,
    name: 'Nike Pro Men Set',
    description: 'Compression-fit top and bottom. Supports muscle recovery and optimal ventilation.',
    price: 62.00,
    originalPrice: 85.00,
    discount: '27%',
    rating: 4.9,
    image: '/New_folder/nike3.webp',
    category: 'men',
  },
  {
    id: 704,
    name: 'Nike Men Activewear Combo',
    description: 'Soft stretchable fabric gym suit. Designed for high performance and comfort.',
    price: 57.25,
    originalPrice: 75.00,
    discount: '24%',
    rating: 4.6,
    image: '/New_folder/nike4.webp',
    category: 'men',
  },
];

const sizes = ['S', 'M', 'L', 'XL'];


const getAdjustedPrices = (basePrice, baseOriginalPrice, size) => {
  let price = basePrice;
  let originalPrice = baseOriginalPrice;

 
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
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const { data: session } = useSession();

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

  const filteredProducts = clothingProducts.filter((product) =>
    selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div
      className="h-full min-h-screen mt-[65px] bg-[#f0f2f5] pt-[70px] w-full px-4"
      //style={{ backgroundImage: "url('/New_folder/clothing.png')" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 font-bold text-black w-fit mx-auto mb-6 shadow">
        Latest Nike Gym Suit
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 my-6 flex-wrap">
        {['all', 'men', 'woman'].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition ${
              selectedCategory === cat
                ? 'bg-[#1e263b] text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4 pb-24">
        {filteredProducts.map((product) => {
          const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, selectedSizes[product.id] || 'M');
          return (
            <div
              key={product.id}
              className="bg-white w-full sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[180px] object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                />
                <h3
                  className="text-lg font-semibold text-gray-800 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-blue-700 font-bold text-lg sm:text-xl">${price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
                  <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
                </div>
                <div className="flex justify-center text-yellow-400 mt-1">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-center gap-2 mb-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-9 w-9 border rounded-md font-medium transition ${
                        (selectedSizes[product.id] || 'M') === size
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
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

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <button
                    className="bg-[#1e263b] text-white px-3 py-2 rounded-md hover:bg-[#334166] transition text-sm flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-2 rounded-md hover:from-orange-500 hover:to-orange-600 transition text-sm flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      buyNow(product);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-200 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:bg-blue-800"
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
