'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const products = [
  {
    id: 6,
    name: 'HP Slim Laptop 14"',
    description: 'Powered by Intel i3 processor, 8GB RAM, and 512GB SSD. Runs on Windows 11 for seamless productivity.',
    price: 629.0,
    originalPrice: 899.0,
    discount: '30%',
    rating: 4.7,
    image: '/New_folder/laptop.jpg',
  },
  {
    id: 2,
    name: 'Boat Bluetooth Speaker',
    description: 'Portable and waterproof speaker with deep bass and long battery life. Perfect for travel or home parties.',
    price: 79.99,
    originalPrice: 119.99,
    discount: '33%',
    rating: 4.6,
    image: '/New_folder/boat_bluetooth.webp',
  },
  {
    id: 12,
    name: 'boAt Headphones',
    description: 'Foldable stereo headphones with 3.5mm jack and crystal-clear sound quality. Ideal for daily use and travel.',
    price: 29.99,
    originalPrice: 45.0,
    discount: '33%',
    rating: 4.4,
    image: '/New_folder/headphones.jpg',
  },
  {
    id: 9,
    name: 'Logitech HD Webcam',
    description: 'Stream in 1080p Full HD with autofocus and built-in noise reduction microphone for clear video calls.',
    price: 59.0,
    originalPrice: 89.0,
    discount: '33%',
    rating: 4.5,
    image: '/New_folder/webcam.webp',
  },
  {
    id: 3,
    name: 'boAt Smart Watch',
    description: 'Track your heart rate, sleep, and steps. 7-day battery backup with multiple watch faces and sport modes.',
    price: 59.99,
    originalPrice: 90.0,
    discount: '33%',
    rating: 4.8,
    image: '/New_folder/noise_smart_watch.webp',
  },
  {
    id: 4,
    name: 'OnePlus Buds Z2',
    description: '38-hour battery backup, Active Noise Cancellation (ANC), and punchy bass. Great for all-day listening.',
    price: 89.99,
    originalPrice: 135.0,
    discount: '33%',
    rating: 4.7,
    image: '/New_folder/earbud.webp',
  },
  {
    id: 5,
    name: 'Dell Wireless Mouse',
    description: 'Compact and smooth 2.4GHz wireless mouse with long battery life. Designed for both office and travel use.',
    price: 19.99,
    originalPrice: 30.0,
    discount: '33%',
    rating: 4.3,
    image: '/New_folder/dell mouse.webp',
  },
  {
    id: 7,
    name: 'Mi Power Bank 20000mAh',
    description: 'Fast-charging power bank with dual output ports and USB-C input. Ideal for charging multiple devices.',
    price: 34.99,
    originalPrice: 50.0,
    discount: '30%',
    rating: 4.6,
    image: '/New_folder/powerbank.jpg',
  },
  {
    id: 8,
    name: 'Cosmic Byte Gaming Keyboard',
    description: 'RGB backlit keyboard with mechanical feel and USB support. Great for gaming, typing, and long sessions.',
    price: 49.99,
    originalPrice: 75.0,
    discount: '33%',
    rating: 4.5,
    image: '/New_folder/keyboard.webp',
  },
  {
    id: 10,
    name: 'Realme Smart TV Stick',
    description: 'Stream Full HD content with Google Assistant and Dolby Audio. Easy plug-and-play with any HDMI TV.',
    price: 39.99,
    originalPrice: 60.0,
    discount: '33%',
    rating: 4.2,
    image: '/New_folder/stick.webp',
  },
  {
    id: 11,
    name: 'Canon Inkjet Printer',
    description: 'Wi-Fi-enabled all-in-one color inkjet printer for home or office. Print, scan, and copy with ease.',
    price: 109.99,
    originalPrice: 160.0,
    discount: '31%',
    rating: 4.4,
    image: '/New_folder/printer.webp',
  },
  {
    id: 1,
    name: 'Smartphone XPro',
    description: 'Comes with 128GB storage, 64MP camera, fast charging, and a smooth display. Great value for tech lovers.',
    price: 499.0,
    originalPrice: 699.0,
    discount: '29%',
    rating: 4.9,
    image: '/New_folder/smartphone.webp',
  },
];

export default function GadgetsPage() {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const {data:session}=useSession();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
     toast.success("item added to cart")
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="bg-[#e3e6f3] min-h-screen pt-[80px] p-[25px] px-4 sm:px-6"
      style={{ backgroundImage: "url('/New_folder/electronic27.png')" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 w-fit mx-auto text-black mb-6 shadow">
        ELECTRONIC ITEMS
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for gadgets..."
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 pb-24">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/product/${product.id}`)}
            className="bg-white sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl cursor-pointer flex flex-col justify-between"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[220px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-black font-bold text-lg sm:text-xl">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                <span className="text-red-500 text-sm font-semibold">({product.discount} OFF)</span>
              </div>
              <div className="flex justify-center text-yellow-400 mt-1">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="flex-1 bg-[#1e263b] text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm sm:text-base"
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

      {/* Floating Cart Icon */}
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