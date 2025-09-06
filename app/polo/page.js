'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const products = [
  {
    id: 501,
    name: 'US Polo Leather Belt',
    description: 'Classic brown leather belt with polished buckle. Perfect for formal and semi-formal attire.',
    price: 21.99,
    originalPrice: 30.00,
    discount: '27%',
    rating: 4.5,
    image: '/New_folder/belt.webp',
    category: 'belt',
  },
  {
    id: 502,
    name: 'US Polo Brown Belt',
    description: 'Sleek black belt with embossed US Polo branding. Durable and stylish for daily use.',
    price: 23.50,
    originalPrice: 32.00,
    discount: '26%',
    rating: 4.7,
    image: '/New_folder/belt2.webp',
    category: 'belt',
  },
  {
    id: 505,
    name: 'US Polo Classic Cap',
    description: 'Timeless cotton cap with US Polo logo. Adjustable strap ensures perfect fit.',
    price: 15.99,
    originalPrice: 22.00,
    discount: '27%',
    rating: 4.4,
    image: '/New_folder/cap4.webp',
    category: 'cap',
  },
  {
    id: 506,
    name: 'US Polo Cap',
    description: 'Navy blue cap with curved brim. Perfect for sunny days and sporty looks.',
    price: 16.49,
    originalPrice: 24.00,
    discount: '31%',
    rating: 4.6,
    image: '/New_folder/cap.webp',
    category: 'cap',
  },
  {
    id: 507,
    name: 'US Polo Sports Cap',
    description: 'Breathable mesh cap for active lifestyle. Lightweight and sweat-resistant.',
    price: 17.25,
    originalPrice: 25.00,
    discount: '31%',
    rating: 4.5,
    image: '/New_folder/cap2.webp',
    category: 'cap',
  },
  {
    id: 508,
    name: 'US Polo Cap',
    description: 'Detailed embroidery with branded logo. A fashionable accessory for casual outfits.',
    price: 18.50,
    originalPrice: 28.00,
    discount: '34%',
    rating: 4.8,
    image: '/New_folder/cap3.webp',
    category: 'cap',
  },
  {
    id: 503,
    name: 'US Polo Textured Belt',
    description: 'Elegant textured finish with metal pin buckle. Adds sophistication to your wardrobe.',
    price: 24.75,
    originalPrice: 35.00,
    discount: '29%',
    rating: 4.9,
    image: '/New_folder/belt3.webp',
    category: 'belt',
  },
  {
    id: 504,
    name: 'US Polo Reversible Belt',
    description: '2-in-1 reversible belt (black & brown). Great for travel and versatile styling.',
    price: 26.99,
    originalPrice: 38.00,
    discount: '29%',
    rating: 4.8,
    image: '/New_folder/belt4.webp',
    category: 'belt',
  },
];

export default function AccessoriesPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const {data:session}=useSession();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
     toast.success("item added to cart")
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const buyNow = (product) => {
    if(!session){
      alert("Login required");
      router.push("/login");
    }
    else{

      localStorage.setItem('cart', JSON.stringify([product]));
      router.push('/checkout');
    }
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div
      className="min-h-screen mt-[65px] p-[25px] bg-no-repeat bg-cover pt-[70px]"
      style={{ backgroundImage: "url('/New_folder/clothing.png')" }}
    >
      <div className="flex justify-center mb-4">
        <h2 className="text-3xl bg-white/60 backdrop-blur-2xl rounded-2xl px-6 py-3 font-bold text-black shadow-lg">
          US POLO Products
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 my-6 flex-wrap">
        {['all', 'belt', 'cap'].map((cat) => (
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
        {filteredProducts.map((product) => (
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
                <span className="text-blue-700 font-bold text-lg sm:text-xl">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
              </div>
              <div className="flex justify-center text-yellow-400 mt-1">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
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
        ))}
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