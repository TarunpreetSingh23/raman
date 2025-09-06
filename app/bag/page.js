'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

// Updated product data with 'type' property
const facialProducts = [
  { id: 801, name: 'Haute Sauce pink hand Bag', description: 'Elegant brown leather bag with fine stitching.\nPerfect for both work and travel.', price: 79.99, originalPrice: 99.99, discount: 20, image: '/New_folder/bag18.webp', category: 'haute sauce', type: 'hand bag', rating: 4.5 },
  { id: 802, name: 'Caprese Shoulder Bag', description: 'Premium black leather bag with laptop compartment.\nSleek design for professionals.', price: 89.50, originalPrice: 115.00, discount: 22, image: '/New_folder/bag12.webp', category: 'caprese', type: 'hand bag', rating: 4.6 },
  { id: 803, name: 'Caprese Shoulder Bag', description: 'Textured leather with metallic accents.\nIdeal for formal or semi-formal wear.', price: 92.28, originalPrice: 120.00, discount: 23, image: '/New_folder/bag13.webp', category: 'caprese', type: 'shoulder bag', rating: 4.4 },
  { id: 804, name: 'Haute Sauce shoulder Bag', description: 'Stylish reversible leather tote.\nUse either black or brown side to match your outfit.', price: 94.78, originalPrice: 118.48, discount: 20, image: '/New_folder/bag14.webp', category: 'haute sauce', type: 'hand bag', rating: 4.7 },
  { id: 805, name: 'Haute Sauce shoulder Bag', description: 'Compact leather messenger with flap closure.\nPerfect for casual urban style.', price: 72.99, originalPrice: 95.00, discount: 23, image: '/New_folder/bag15.webp', category: 'haute sauce', type: 'hand bag', rating: 4.3 },
  { id: 806, name: 'Caprese hand Bag', description: 'Lightweight crossbody with adjustable strap.\nGreat for daily errands and travel.', price: 68.49, originalPrice: 85.61, discount: 20, image: '/New_folder/bag16.webp', category: 'caprese', type: 'shoulder bag', rating: 4.5 },
  { id: 807, name: 'Haute Sauce tot hand Bag', description: 'Spacious duffel bag made of pure leather.\nPerfect companion for weekend trips.', price: 104.28, originalPrice: 140.92, discount: 26, image: '/New_folder/bag17.webp', category: 'haute sauce', type: 'hand bag', rating: 4.8 },
  { id: 810, name: 'caprese  urban hand bag', description: 'Modern and versatile backpack designed for digital nomads. It features padded compartments for laptops and gadgets, water-resistant material, and multiple pockets for organization. Ideal for daily commuting and short business trips.', price: 89.99, originalPrice: 119.99, discount: '25%', image: '/images/bag21.webp', category: 'caprese', type: 'hand bag', rating: 4.6, highlights: ['makeup compartment', 'Water-resistant', 'Multi-pocket', 'Compact', 'Versatile',] },
  { id: 811, name: 'caprese Canvas hand bag', description: 'Rugged and stylish duffel bag made with waxed canvas and leather accents. Perfect for road trips and gym sessions. The bag is lightweight yet sturdy, with a timeless aesthetic.', price: 74.50, originalPrice: 99.00, discount: '25%', image: '/images/bag22.webp', category: 'caprese', type: 'hand bag', rating: 4.4, highlights: ['Waxed canvas', 'Leather accents', 'Lightweight', 'Timeless design', 'Road trip ready'] },
  { id: 812, name: ' Caprese Leather hand bag', description: 'Elegant leather briefcase tailored for professionals. Features a padded laptop sleeve, interior organizer, and high-quality metal zippers. Perfect for office, meetings, or formal events.', price: 139.00, originalPrice: 185.00, discount: '25%', image: '/images/bag23.webp', category: 'caprese', type: 'hand bag', rating: 4.9, highlights: ['Professional look', 'side sleeve', 'Premium zippers', 'Organizer', 'Formal use'] },
  { id: 813, name: 'Caprese Sling Shoulder Bag', description: 'Minimalist crossbody bag ideal for quick errands and travel. It features an adjustable strap, anti-theft pockets, and durable zippers. Compact and lightweight, yet spacious enough for essentials.', price: 34.95, originalPrice: 49.99, discount: '30%', image: '/images/bag24.webp', category: 'caprese', type: 'shoulder bag', rating: 4.5, highlights: ["water resistant", 'Lightweight', 'Travel-friendly', 'Durable', 'Minimalist'] },
  { id: 814, name: 'Haute sauce shoulder bag', description: 'Designed for outdoor events, this premium bag is made from recycled materials. It includes a hydration pack compartment, rain cover, and extra back padding for comfort during long treks.', price: 97.80, originalPrice: 139.99, discount: '30%', image: '/images/bag25.webp', category: 'haute sauce', type: 'hand bag', rating: 4.7, highlights: ["premium quality", "durable ",'Hydration compatible', 'Rain cover', 'Padded back', 'Outdoor use'] },
  { id: 815, name: 'Haute Sauce hand bag', description: 'Lightweight and sleek carry-on hand . Ideal for frequent flyers who prioritize mobility and efficiency. Its hard shell protects contents without adding bulk.', price: 129.99, originalPrice: 174.99, discount: '26%', image: '/images/bag26.webp', category: 'haute sauce', type: 'hand bag', rating: 4.8, highlights: ['black ', 'golden strip', 'Hard shell', 'Travel-ready', 'Compact'] },
  { id: 816, name: 'Haute sauce hand Bag', description: 'A versatile everyday tote made from canvas and vegan leather. It’s roomy enough for books, gadgets, and essentials. Great for work, school, or a day out.', price: 45.00, originalPrice: 60.00, discount: '25%', image: '/images/bag27.webp', category: 'haute sauce', type: 'hand bag', rating: 4.3, highlights: ['Everyday use', 'Vegan leather', 'Spacious', 'Trendy', 'Light carry'] },
  { id: 817, name: 'haute Sauce shoulder bag', description: 'Stylish and durable pink bag that offers stylish look, and a golden strip . Ideal for athletes or fitness enthusiasts.', price: 59.90, originalPrice: 79.90, discount: '25%', image: '/images/bag28.webp', category: 'haute sauce', type: 'shoulder bag', rating: 4.6, highlights: ['Wet/dry separation', 'pink', 'golden strip', 'Athlete-friendly', 'Durable'] },
  { id: 808, name: 'caprese Shoulder Leather Bag', description: 'High-end leather bag with embossed logo.\nBlends style with utility for any occasion.', price: 112.50, originalPrice: 150.00, discount: 25, image: '/New_folder/bag11.webp', category: 'caprese', type: 'hand bag', rating: 4.7 },
];

export default function FacialPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  const getSubcategories = (category) => {
  const allowedTypes = ['hand bag', 'shoulder bag'];
  const subs = new Set();

  facialProducts.forEach((p) => {
    if (p.category === category && allowedTypes.includes(p.type)) {
      subs.add(p.type);
    }
  });

  return Array.from(subs);
};


  const filteredProducts = facialProducts.filter((product) => {
    if (selectedCategory === 'all') return true;
    if (product.category !== selectedCategory) return false;
    if (selectedSubCategory === 'all') return true;
    return product.name.toLowerCase().includes(selectedSubCategory.toLowerCase());
  });

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
    toast.success('Item added to cart!');
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const buyNow = (product) => {
    if (!session) {
      alert("Login required");
      router.push("/login");
    } else {
      addToCart(product);
      router.push('/checkout');
    }
  };

  return (
    <>
     
      <div
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:bg-gray-900 transition-all"
        onClick={() => router.push('/cart')}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>

    
      <div className="relative min-h-screen mt-[65px] p-[25px] bg-no-repeat bg-cover pt-[70px]">
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl bg-white/60 backdrop-blur-2xl rounded-2xl px-6 py-3 font-bold text-black shadow-lg">
           Women Leather Bags
          </h2>
        </div>

       
        <div className="flex justify-center gap-4 my-6 flex-wrap">
          {['all', 'caprese', 'haute sauce'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition ${
                selectedCategory === cat
                  ? 'bg-[#1e263b] text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubCategory('all');
              }}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
            </button>
          ))}
        </div>

       
        {selectedCategory !== 'all' && (
          <div className="flex justify-center gap-4 my-2 flex-wrap">
            <button
              key="all"
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedSubCategory === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedSubCategory('all')}
            >
              All
            </button>
            {getSubcategories(selectedCategory).map((sub) => (
              <button
                key={sub}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedSubCategory === sub
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSubCategory(sub)}
              >
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </button>
            ))}
          </div>
        )}

       
        <div className="flex flex-wrap justify-center gap-6 px-4 pb-24">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/90 w-full sm:w-[47%] md:w-[32%] lg:w-[280px] h-[420px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl cursor-pointer flex flex-col justify-between relative"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[180px] object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-center gap-2 items-center mt-2">
                  <span className="text-blue-700 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-sm line-through mr-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-red-500 text-sm">
                    {typeof product.discount === 'string' ? product.discount : `${product.discount}% OFF`}
                  </span>
                </div>
                {product.rating && (
                  <div className="flex justify-center mt-2">
                    <span className="text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <button
                  className="bg-[#1e263b] text-white px-4 py-2 rounded-md hover:bg-[#334166] transition text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-orange-600 transition text-sm"
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
      </div>
    </>
  );
}