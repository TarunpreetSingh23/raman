'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const clothingProducts = [
  {
    id: 401,
    name: 'Tommy T-Shirt White',
    description: 'Classic white t-shirt with signature Tommy logo. Soft cotton fabric ideal for summer comfort.',
    price: 25.99,
    originalPrice: 35.00,
    discount: '26%',
    rating: 4.5,
    image: '/New_folder/tommy.jpeg',
    category: 'T-Shirt',
  },
  {
    id: 402,
    name: 'Tommy Graphic Tee',
    description: 'Trendy graphic print tee for casual style. Made with breathable fabric and relaxed fit.',
    price: 27.49,
    originalPrice: 40.00,
    discount: '31%',
    rating: 4.2,
    image: '/New_folder/tommy2.jpeg',
    category: 'T-Shirt',
  },
  {
    id: 405,
    name: 'Tommy Track Pants',
    description: 'Comfortable track pants with elastic waistband. Ideal for gym, sports, or lounging.',
    price: 35.99,
    originalPrice: 50.00,
    discount: '28%',
    rating: 4.7,
    image: '/New_folder/tommy_lower.webp',
    category: 'Lower',
  },
  {
    id: 406,
    name: 'Tommy Lounge Lowers',
    description: 'Soft cotton lowers perfect for relaxed days. Simple design with subtle branding.',
    price: 34.49,
    originalPrice: 45.00,
    discount: '23%',
    rating: 4.4,
    image: '/New_folder/tommy_lower2.webp',
    category: 'Lower',
  },
  {
    id: 403,
    name: 'Tommy Striped T-Shirt',
    description: 'Striped cotton tee with round neck design. Pairs well with denim and joggers.',
    price: 28.99,
    originalPrice: 38.00,
    discount: '24%',
    rating: 4.6,
    image: '/New_folder/tommy3.jpeg',
    category: 'T-Shirt',
  },
  {
    id: 404,
    name: 'Tommy Slim Fit Tee',
    description: 'Slim-fit t-shirt designed for a sharp silhouette. Made from stretchable cotton jersey.',
    price: 26.50,
    originalPrice: 35.00,
    discount: '24%',
    rating: 4.1,
    image: '/New_folder/tommy4.jpeg',
    category: 'T-Shirt',
  },
  {
    id: 407,
    name: 'Tommy Athletic Joggers',
    description: 'Athletic fit joggers with tapered legs. Quick-dry fabric ideal for training sessions.',
    price: 36.75,
    originalPrice: 52.00,
    discount: '29%',
    rating: 4.8,
    image: '/New_folder/tommy_lower4.webp',
    category: 'Lower',
  },
  {
    id: 408,
    name: 'Tommy Cuffed Pants',
    description: 'Stylish cuffed joggers with side stripes. Modern design for both gym and street style.',
    price: 38.25,
    originalPrice: 55.00,
    discount: '30%',
    rating: 4.9,
    image: '/New_folder/tommy_lower3.webp',
    category: 'Lower',
  },
];

const sizes = ['S', 'M', 'L', 'XL'];


const getAdjustedPrices = (basePrice, baseOriginalPrice, size) => {
  let price = basePrice;
  let originalPrice = baseOriginalPrice;


  if (size === 'L') {
    price = basePrice * 1.05; 
    originalPrice = baseOriginalPrice * 1.05;
  } 
  else if(size==="S"){
    price=basePrice/1.10;
    originalPrice=baseOriginalPrice/1.10;
  }
  else if (size === 'XL') {
    price = basePrice * 1.10; 
    originalPrice = baseOriginalPrice * 1.10;
  }
  return { price, originalPrice };
};

export default function ClothingPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [filterCategory, setFilterCategory] = useState('All');
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
    filterCategory === 'All'
      ? clothingProducts
      : clothingProducts.filter((p) => p.category === filterCategory);

  return (
    <div className="h-full min-h-screen mt-[65px] bg-[#f0f2f5] pt-[70px] w-full px-4"
      style={{ backgroundImage: "url('/New_folder/clothing.png')" }}>
      <h2 className="text-xl sm:text-2xl md:text-3xl bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 font-bold text-black w-fit mx-auto mb-6 shadow">
        Latest Fashion Products
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All', 'T-Shirt', 'Lower'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md transition ${
              filterCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap justify-center items-center gap-6 pb-24">
        {filteredProducts.map((product) => {
          const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, selectedSizes[product.id] || 'M');
          return (
            <div
              key={product.id}
              className="bg-white w-full sm:w-[47%] md:w-[32%] lg:w-[280px] rounded-xl shadow-md p-4 text-center transition hover:shadow-xl cursor-pointer flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[220px] object-cover rounded-md mb-4"
                onClick={() => router.push(`/product/${product.id}`)}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800"
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
                  <span className="text-blue-700 font-bold text-lg sm:text-xl">
                    ${price.toFixed(2)}
                  </span>
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

      {/* Floating Cart Icon */}
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
