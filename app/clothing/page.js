'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const clothingProducts = [
  {
    id: 102,
    name: 'Denim Jacket',
    description: 'Classic denim jacket that fits any outfit and season.',
    price: 39.99,
    originalPrice: 59.99,
    discount: '33%',
    image: '/New_folder/denim_jacket.webp',
    rating: 4.5,
    category: 'clothing',
    gender: 'mens'
  },
  {
    id: 103,
    name: 'Summer T-shirt',
    description: 'Soft cotton t-shirt for summer comfort and breathability.',
    price: 19.99,
    originalPrice: 29.99,
    discount: '33%',
    image: '/New_folder/summer_tshirt.webp',
    rating: 4.2,
    category: 'clothing',
    gender: 'mens'
  },

  {
    id: 302,
    name: 'Puma Joggers light',
    description: 'These light grey joggers are a versatile addition to your casual wardrobe. They feature a sleek, modern fit and convenient side pockets for your essentials. Perfect for running errands or hitting the gym, they provide a great balance of comfort and style. The fabric is soft and breathable, ensuring you stay comfortable throughout your day. These joggers are a must-have for a relaxed and sporty look.',
    price: 30.49,
    originalPrice: 45.0,
    discount: '32%',
    image: '/New_folder/puma_joggers1.jpg',
    category: 'puma',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.5,
    highlights: ['Sleek fit', 'Side pockets', 'Running errands', 'Gym wear', 'Comfortable', 'Sporty'],
  },
  {
    id: 307,
    name: 'Puma ultra Hoodie',
    description: 'Stay cozy and stylish with this full-zip hoodie from Puma. It features front pockets for keeping your hands warm and storing small items. The hoodie is designed for both performance during workouts and casual everyday wear. The comfortable fabric and thoughtful design make it a great layering piece. This is a versatile hoodie that fits perfectly into an active lifestyle.',
    price: 45.0,
    originalPrice: 65.0,
    discount: '31%',
    image: '/New_folder/puma_hoddy3.jpg',
    category: 'puma',
    subcategory: "hoodie",
    gender: 'mens',
    rating: 4.6,
    highlights: ["warmth", "threading logo", 'Performance', 'Casual wear', 'Comfortable', 'Layering'],
  },
  {
    id: 304,
    name: 'Casual Puma Joggers',
    description: 'These casual joggers are your go-to for maximum comfort. They are made with a soft cotton lining that feels gentle against your skin. Great for lounging at home or creating a comfortable daily outfit, they offer a relaxed fit. The simple and understated design makes them easy to pair with any t-shirt or hoodie. These joggers are all about comfort and effortless style.',
    price: 29.99,
    originalPrice: 40.0,
    discount: '25%',
    image: '/New_folder/puma_joggers3.webp',
    category: 'puma',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.4,
    highlights: ['Soft cotton', 'Casual wear', 'Lounging', 'Relaxed fit', 'Comfortable', 'Daily looks'],
  },
  {
    id: 305,
    name: 'Puma Hoodie',
    description: 'This navy blue hoodie is a classic for a reason, offering timeless style and exceptional comfort. The soft fleece interior provides superior warmth and a cozy feel. It features a relaxed fit and an adjustable drawstring hood, so you can customize your comfort. This hoodie is perfect for layering during cooler weather and is a versatile addition to any casual wardrobe.',
    price: 43.99,
    originalPrice: 60.0,
    discount: '27%',
    image: '/New_folder/puma_hoody1.jpg',
    category: 'puma',
    subcategory: "hoodie",
    gender: 'mens',
    rating: 4.3,
    highlights: ['Soft fleece', 'Relaxed fit', 'Drawstring hood', 'Warmth', 'Versatile'],
  },
  {
    id: 306,
    name: 'Puma Classic Hoodie',
    description: 'A classic pullover hoodie that is perfect for any casual occasion. It features ribbed cuffs and hem, providing a secure and comfortable fit. This hoodie is ideal for layering during the winter or on chilly evenings. The high-quality material ensures it will be a durable and long-lasting part of your wardrobe. Its simple and clean design makes it a reliable choice for everyday comfort.',
    price: 41.5,
    originalPrice: 58.0,
    discount: '28%',
    image: '/New_folder/puma_hoody2.jpg',
    category: 'puma',
    subcategory: "hoodie",
    gender: 'mens',
    rating: 4.5,
    highlights: ['Classic pullover', 'Ribbed cuffs', 'Layering', 'Winter wear', 'Durable', 'Everyday comfort'],
  },
  {
    id: 301,
    name: 'Puma Joggers',
    description: 'These stylish black joggers are engineered for comfort and everyday wear. Made from a stretchable and breathable fabric, they ensure all-day comfort and mobility. The sleek design makes them perfect for a variety of casual settings. Whether you are running errands or relaxing at home, these joggers provide a modern and comfortable fit. They are a must-have for a contemporary, active lifestyle.',
    price: 32.99,
    originalPrice: 50.0,
    discount: '34%',
    image: '/New_folder/puma_joggers.webp',
    category: 'puma',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.6,
    highlights: ['Stylish', 'Everyday comfort', 'Stretchable', 'Breathable', 'Modern fit', 'Versatile'],
  },
  {
    id: 303,
    name: 'Puma Track Joggers',
    description: 'These athletic joggers are perfect for workouts and active days outdoors. They are made with moisture-wicking material that keeps you dry and comfortable during exercise. The design is optimized for performance, offering a full range of motion. These joggers are a great choice for hitting the track or enjoying a hike. They are an essential piece for any serious athlete.',
    price: 33.99,
    originalPrice: 48.0,
    discount: '29%',
    image: '/New_folder/puma_joggers2.webp',
    category: 'puma',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.7,
    highlights: ['Athletic', 'Moisture-wicking', 'Workouts', 'Active days', 'Comfortable', 'Performance'],
  },
  {
    id: 308,
    name: 'Lightweight Puma Hoodie',
    description: 'This lightweight hoodie is perfect for transitional weather when you need a little extra warmth without the bulk. It provides an excellent blend of comfort and mobility, making it suitable for daily use. The soft material feels great against the skin, and the relaxed fit allows for easy movement. This is a versatile layering piece for anyone who values both style and comfort.',
    price: 39.99,
    originalPrice: 55.0,
    discount: '27%',
    image: '/New_folder/puma_hoddy4.jpg',
    category: 'puma',
    subcategory: "hoodie",
    gender: 'mens',
    rating: 4.4,
    highlights: ['Lightweight', 'Transitional weather', 'Mobility', 'Daily use', 'Comfortable', 'Versatile'],
  },
  {
    id: 401,
    name: 'Tommy T-Shirt White',
    description: 'A timeless classic, this white t-shirt features the signature Tommy logo on the chest. Made from soft cotton fabric, it is an ideal choice for summer, providing superior comfort and breathability. The simple yet stylish design makes it a versatile piece that can be dressed up or down. This t-shirt is a fundamental building block for any casual wardrobe.',
    price: 25.99,
    originalPrice: 35,
    discount: '26%',
    image: '/New_folder/tommy.jpeg',
    category: 'tommy',
    subcategory: "tshirt",
    gender: 'mens',
    rating: 4.5,
    highlights: ['Classic', 'Soft cotton', 'Summer comfort', 'Signature logo', 'Versatile', 'Breathable'],
  },
  {
    id: 402,
    name: 'Tommy Graphic Tee',
    description: 'Express your style with this trendy graphic print tee. It features a unique design that adds a modern flair to your casual look. The shirt is made with a breathable fabric and has a relaxed fit, ensuring maximum comfort throughout the day. It is a great choice for a casual outing with friends or a laid-back day. This tee is a statement piece for your wardrobe.',
    price: 27.49,
    originalPrice: 40.0,
    discount: '31%',
    image: '/New_folder/tommy2.jpeg',
    category: 'tommy',
    subcategory: "tshirt",
    gender: 'mens',
    rating: 4.3,
    highlights: ['Trendy', 'Graphic print', 'Breathable', 'Relaxed fit', 'Casual style', 'Comfortable'],
  },
  {
    id: 405,
    name: 'Tommy Track Pants',
    description: 'These comfortable track pants are perfect for an active lifestyle and relaxed days. They feature an elastic waistband for a secure and comfortable fit. They are ideal for gym sessions, sports activities, or simply lounging at home. The soft fabric provides a cozy feel. These track pants are a versatile piece that balances functionality and casual style effortlessly.',
    price: 35.99,
    originalPrice: 50.0,
    discount: '28%',
    image: '/New_folder/tommy_lower.webp',
    category: 'tommy',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.4,
    highlights: ['Comfortable', 'Elastic waistband', 'Gym wear', 'Lounging', 'Versatile', 'Activewear'],
  },
  {
    id: 406,
    name: 'Tommy Lounge Lowers',
    description: 'Perfect for relaxed days, these lounge lowers are made from soft cotton, providing ultimate comfort. They have a simple design with subtle branding, making them easy to wear at home or for a quick trip outside. The fabric is gentle on the skin, and the fit is designed for maximum relaxation. These lowers are a must-have for unwinding after a long day.',
    price: 34.49,
    originalPrice: 45.0,
    discount: '23%',
    image: '/New_folder/tommy_lower2.webp',
    category: 'tommy',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.2,
    highlights: ['Soft cotton', 'Lounging', 'Relaxed fit', 'Simple design', 'Comfortable', 'Daily wear'],
  },
  {
    id: 407,
    name: 'Tommy Athletic Joggers',
    description: 'These athletic joggers are designed with performance in mind. They feature a tapered fit that provides a streamlined silhouette and does not get in the way during workouts. The quick-dry fabric is ideal for training sessions, wicking away moisture to keep you comfortable. These joggers are a stylish and functional choice for any serious athlete. They offer both performance and modern style.',
    price: 36.75,
    originalPrice: 52.0,
    discount: '29%',
    image: '/New_folder/tommy_lower4.webp',
    category: 'tommy',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.6,
    highlights: ['Athletic fit', 'Tapered legs', 'Quick-dry fabric', 'Training sessions', 'Functional', 'Performance'],
  },
  {
    id: 408,
    name: 'Tommy Cuffed Pants',
    description: 'These stylish cuffed joggers are a perfect blend of modern design and comfort. They feature side stripes that add a sporty and trendy touch. The joggers are suitable for both the gym and street style, making them incredibly versatile. The cuffed ankles provide a clean and polished look. These pants are a great way to elevate your casual and athletic outfits.',
    price: 38.25,
    originalPrice: 55.0,
    discount: '30%',
    image: '/New_folder/tommy_lower3.webp',
    category: 'tommy',
    subcategory: "lowers",
    gender: 'mens',
    rating: 4.5,
    highlights: ['Stylish', 'Cuffed joggers', 'Side stripes', 'Street style', 'Modern design', 'Versatile'],
  },
  {
    id: 403,
    name: 'Tommy Striped T-Shirt',
    description: 'Add a classic touch to your wardrobe with this striped cotton tee. The round neck design and timeless pattern make it a versatile piece for a variety of outfits. It pairs exceptionally well with denim jeans and casual joggers. The soft cotton fabric ensures all-day comfort and breathability. This tee is a reliable choice for a stylish yet effortless look.',
    price: 28.99,
    originalPrice: 38.0,
    discount: '24%',
    image: '/New_folder/tommy3.jpeg',
    category: 'tommy',
    subcategory: "tshirt",
    gender: 'mens',
    rating: 4.4,
    highlights: ['Striped pattern', 'Round neck', 'Soft cotton', 'Versatile', 'Comfortable', 'Everyday wear'],
  },
  {
    id: 404,
    name: 'Tommy Slim Fit Tee',
    description: 'Designed for a sharp and modern silhouette, this slim-fit t-shirt is made from stretchable cotton jersey. The fabric provides a comfortable and body-hugging fit without restricting movement. It is an excellent choice for a polished and clean look. This tee is a great foundation for layering or wearing on its own. It is an essential for any man who appreciates a tailored fit.',
    price: 26.5,
    originalPrice: 35.0,
    discount: '24%',
    image: '/New_folder/tommy4.jpeg',
    category: 'tommy',
    subcategory: "tshirt",
    gender: 'mens',
    rating: 4.3,
    highlights: ['Slim fit', 'Sharp silhouette', 'Stretchable cotton', 'Polished look', 'Modern', 'Tailored'],
  },
  {
    id: 701,
    name: 'Nike Men Gym Suit',
    description: 'This breathable gym suit is equipped with dry-fit technology to keep you cool and comfortable during your workouts. It is ideal for intense training sessions and daily exercise routines. The suit provides a flexible and unrestricted fit, allowing for a full range of motion. It is a perfect choice for serious athletes and fitness enthusiasts. This suit helps you perform at your best.',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25%',
    image: '/New_folder/nike1.webp',
    category: 'nike',
    subcategory: "mens",
    gender: 'mens',
    rating: 4.7,
    highlights: ['Breathable', 'Dry-fit technology', 'Intense training', 'Flexible fit', 'Gym wear', 'Comfortable'],
  },
  {
    id: 702,
    name: 'Nike Men Training Set',
    description: 'This training set includes a slim-fit tee and shorts, offering a complete athletic look. The flexible and sweat-resistant fabric ensures comfort and mobility during any physical activity. It is designed to provide a full range of motion, so you can move freely. This set is a great choice for both casual workouts and more serious training. It combines style and performance seamlessly.',
    price: 54.5,
    originalPrice: 70.0,
    discount: '22%',
    image: '/New_folder/nike2.webp',
    category: 'nike',
    subcategory: "mens",
    gender: 'mens',
    rating: 4.6,
    highlights: ['Slim-fit', 'Sweat-resistant', 'Training', 'Flexible fabric', 'Full range motion', 'Stylish'],
  },
  {
    id: 705,
    name: 'Nike Women Gym Suit',
    description: 'Stay stylish and comfortable during your workouts with this gym suit designed for active women. It features a comfortable fit and quick-dry technology, keeping you cool and dry. The suit is perfect for a variety of exercises, from cardio to weightlifting. It is a functional and fashionable choice for any fitness journey. This suit helps you feel confident and ready to train.',
    price: 58.9,
    originalPrice: 75.0,
    discount: '21%',
    image: '/New_folder/nike8.webp',
    subcategory: "womans",
    category: 'nike',
    gender: 'womans',
    rating: 4.5,
    highlights: ['Stylish', 'Quick-dry', 'Comfortable fit', 'Active women', 'Functional', 'Gym wear'],
  },
  {
    id: 706,
    name: 'Nike Women Workout Set',
    description: 'This workout set includes high-waist leggings and a supportive sports bra, providing a complete and functional outfit. It is designed for optimal performance during yoga, running, or gym sessions. The supportive fit ensures you feel secure and comfortable during your movements. The high-quality fabric is durable and flexible. This set is a perfect blend of fashion and fitness.',
    price: 61.0,
    originalPrice: 80.0,
    discount: '24%',
    image: '/New_folder/nike7.webp',
    subcategory: "womans",
    category: 'nike',
    gender: 'womans',
    rating: 4.7,
    highlights: ['High-waist leggings', 'Supportive sports bra', 'Yoga/running', 'Optimal performance', 'Durable', 'Workout'],
  },
  {
    id: 707,
    name: 'Nike Flex Women Set',
    description: 'Experience ultimate comfort and mobility with this lightweight and stretchable gym suit. The fabric is designed to give you a full range of motion, making it perfect for dynamic workouts. It is sweat-free and provides exceptional comfort during intense sessions. This set is a great choice for those who value flexibility and unrestricted movement. It is a functional and comfortable piece for your active wardrobe.',
    price: 56.49,
    originalPrice: 72.0,
    discount: '21%',
    image: '/New_folder/nike6.webp',
    category: 'nike',
    subcategory: "womans",
    gender: 'womans',
    rating: 4.6,
    highlights: ['Lightweight', 'Stretchable', 'Full mobility', 'Sweat-free', 'Comfortable', 'Workouts'],
  },
  {
    id: 708,
    name: 'Nike Women Gym Tracksuit',
    description: 'This modern tracksuit is perfect for high-intensity training sessions. The stylish and functional design ensures you look good while you work out. It is made with a breathable fabric that keeps you cool and dry. The tracksuit is a versatile piece that can be worn to the gym or for a casual outing. It combines fashion and functionality seamlessly.',
    price: 60.0,
    originalPrice: 78.0,
    discount: '23%',
    image: '/New_folder/nike5.webp',
    category: 'nike',
    subcategory: "womans",
    gender: 'womans',
    rating: 4.5,
    highlights: ['Modern tracksuit', 'High-intensity', 'Breathable fabric', 'Functional', 'Stylish', 'Versatile'],
  },
  {
    id: 703,
    name: 'Nike Pro Men Set',
    description: 'This compression-fit set is engineered to support muscle recovery and provide optimal ventilation. It includes a top and bottom that hug your body for a secure feel. The design helps in reducing muscle vibration and fatigue, allowing you to train harder for longer. It is perfect for high-performance athletes who need that extra edge. This set is a game-changer for serious training.',
    price: 62.0,
    originalPrice: 85.0,
    discount: '27%',
    image: '/New_folder/nike3.webp',
    category: 'nike',
    subcategory: "mens",
    gender: 'mens',
    rating: 4.8,
    highlights: ['Compression-fit', 'Muscle recovery', 'Optimal ventilation', 'High-performance', 'Supportive', 'Training'],
  },
  {
    id: 704,
    name: 'Nike Men Activewear Combo',
    description: 'This gym suit is made from soft, stretchable fabric, providing ultimate comfort during your active moments. It is designed for high performance, ensuring you can move freely without any restrictions. The combo is perfect for a variety of sports and workouts. The durable material ensures it will hold up to frequent use and washing. It is an essential for any man who prioritizes comfort and quality in their activewear.',
    price: 57.25,
    originalPrice: 75.0,
    discount: '24%',
    image: '/New_folder/nike4.webp',
    category: 'nike',
    subcategory: "mens",
    gender: 'mens',
    rating: 4.6,
    highlights: ['Soft fabric', 'Stretchable', 'High performance', 'Durable', 'Comfortable', 'Activewear'],
  },
  {
    id: 105,
    name: 'Puma Joggers',
    description: 'Comfortable joggers for sports and casual wear.',
    price: 29.99,
    originalPrice: 44.99,
    discount: '33%',
    image: '/New_folder/puma_joggers.webp',
    rating: 4.6,
    category: 'puma',
    gender: 'womans'
  },
  {
    id: 106,
    name: 'Formal Shirt',
    description: 'Classic white shirt for business and formal events.',
    price: 34.99,
    originalPrice: 49.99,
    discount: '30%',
    image: '/New_folder/shirt.webp',
    rating: 4.4,
    category: 'clothing',
    gender: 'mens'
  },
  {
    id: 108,
    name: 'Hooded Sweatshirt',
    description: 'Warm hoodie with kangaroo pocket and fleece lining.',
    price: 44.99,
    originalPrice: 65.00,
    discount: '31%',
    image: '/New_folder/hodded_sweatshirt.webp',
    rating: 4.8,
    category: 'clothing',
    gender: 'unisex'
  },
  {
    id: 109,
    name: 'Printed Scarf',
    description: 'Lightweight and colorful scarf for all outfits.',
    price: 9.99,
    originalPrice: 15.00,
    discount: '33%',
    image: '/New_folder/scraf.webp',
    rating: 4.1,
    category: 'accessories',
    gender: 'womans'
  },
  {
    id: 110,
    name: 'Woolen Cap',
    description: 'Soft knit cap for cold weather comfort.',
    price: 7.99,
    originalPrice: 11.99,
    discount: '33%',
    image: '/New_folder/woolen_cap.webp',
    rating: 4.3,
    category: 'accessories',
    gender: 'womans'
  },
  {
    id: 112,
    name: 'Levi’s Jeans',
    description: 'Premium stretchable denim jeans.',
    price: 54.99,
    originalPrice: 79.99,
    discount: '31%',
    image: '/New_folder/levis_jeans.webp',
    rating: 4.9,
    category: 'clothing',
    gender: 'unisex'
  },
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
  // Decrease both prices by 10% for Small size
  else if (size === 'S') {
    price = basePrice / 1.10;
    originalPrice = baseOriginalPrice / 1.10;
  }
  // Increase both prices by 15% for XL size
  else if (size === 'XL') {
    price = basePrice * 1.15;
    originalPrice = baseOriginalPrice * 1.15;
  }

  return { price, originalPrice };
};

export default function ClothingPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [genderFilter, setGenderFilter] = useState('All'); // New state for gender filter

  const router = useRouter();
  const { data: session } = useSession();

  const categories = ['All', 'nike', 'puma', 'tommy'];
  const genderOptions = ['All', 'mens', 'womans']; // New options for gender filter

  const categoryMap = {
    nike: ['mens', 'womans'], // Subcategory names should match product data
    puma: ['hoodie', 'lowers'],
    tommy: ['tshirt', 'lowers'],
  };

  const formatSubcategoryLabel = (label) => {
    switch (label) {
      case 'mens': return 'Men';
      case 'womans': return 'Women';
      case 'hoodie': return 'Hoodies';
      case 'lowers': return 'Lowers';
      case 'tshirt': return 'T-Shirt';
      default: return label;
    }
  };

  const formatGenderLabel = (label) => {
    switch (label) {
      case 'mens': return 'Men';
      case 'womans': return 'Women';
      default: return 'All';
    }
  };


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

  const handleGenderChange = (gender) => {
    setGenderFilter(gender);
    setSelectedCategory('All'); // Reset other filters
    setSelectedSubcategory(''); // Reset other filters
  };

  const filteredProducts = clothingProducts.filter((product) => {
    const matchesGender = genderFilter === 'All' || product.gender === genderFilter || product.gender === 'unisex';
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === '' || product.subcategory === selectedSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesGender && matchesCategory && matchesSubcategory && matchesSearch;
  });


  return (
    <div
      className="min-h-screen pt-[70px] mt-[65px] bg-[#f0f2f5] px-4 sm:px-6 md:px-10 lg:px-20"
      //style={{ backgroundImage: "url('/New_folder/clothing.png')" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 font-bold text-black w-fit mx-auto mb-4 shadow">
        Latest Fashion Products
      </h2>

      {/* Search Input */}
      <div className="max-w-md mx-auto w-full mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clothing items..."
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Gender Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 my-4">
        {genderOptions.map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderChange(gender)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              genderFilter === gender
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {formatGenderLabel(gender)}
          </button>
        ))}
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 my-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedSubcategory('');
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Subcategory Buttons */}
      {selectedCategory !== 'All' && categoryMap[selectedCategory] && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categoryMap[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedSubcategory === sub
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {formatSubcategoryLabel(sub)}
            </button>
          ))}
        </div>
      )}


      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24">
        {filteredProducts.map((product) => {
          const { price, originalPrice } = getAdjustedPrices(product.price, product.originalPrice, selectedSizes[product.id] || 'M');
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 text-center transition hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[220px] object-cover rounded-md mb-4 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}>
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">{product.description}</p>

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

                <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
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