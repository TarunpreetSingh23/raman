"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { CheckCircle, X, ShoppingCart } from "lucide-react";

// --- Loader Component (Kept clean) ---
function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      <Image
        src="/images/LOGO (2).jpg"
        alt="Logo"
        width={180}
        height={60}
        className="mb-6"
      />
      {/* Centered loader bar */}
      <div className="w-48 h-1 bg-gray-700 rounded overflow-hidden">
        <div className="h-full bg-[#3ab4ff] animate-loaderLine"></div>
      </div>
    </div>
  );
}

// --- Main Service Detail Page ---
export default function ServiceDetailPage() {
  const { serviceName } = useParams();
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [cart, setCart] = useState([]); // Kept for cart logic integrity

  // Helper to normalize strings for comparison
  const normalize = (str) => str?.toLowerCase().replace(/[\s-]+/g, "") || "";

  // ⭐ Add to cart logic
  const addToCart = (newItem) => {
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check for category conflict
    if (existingCart.length > 0) {
      const existingCategory = existingCart[0].category;
      if (existingCategory && newItem.category && existingCategory !== newItem.category) {
        const confirmReplace = window.confirm(
          "Your cart already contains services from another category. Replace it?"
        );
        if (!confirmReplace) return;
        existingCart = []; // Clear existing cart
      }
    }

    // Check if item already exists and update quantity/remove, or add new
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === newItem.id // Assuming each service has a unique ID
    );

    if (existingItemIndex > -1) {
      // If it exists, remove it (or increment/decrement, depending on your app logic)
      // For simplicity here, we'll just add it again as a new instance, or you might prefer:
      // existingCart.splice(existingItemIndex, 1);
      existingCart.push(newItem); // Adding a duplicate for now, checkout handles aggregation
    } else {
      existingCart.push(newItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-white" />
        <span className="text-white font-medium">Added to cart! Proceeding...</span>
      </div>,
      {
        style: {
          background: "linear-gradient(to right, #4ade80, #16a34a)",
          borderRadius: "12px",
          padding: "10px 16px",
        },
        duration: 2500,
      }
    );

    // Navigate to checkout immediately after adding
    router.push("/checkout");
  };

  // ⭐ Render stars
  const renderStars = (rating, sizeClass = "w-4 h-4") =>
    Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return <FaStar key={i} className={`text-yellow-400 ${sizeClass}`} />;
      if (rating >= i + 0.5) return <FaStarHalfAlt key={i} className={`text-yellow-400 ${sizeClass}`} />;
      return <FaRegStar key={i} className={`text-gray-300 ${sizeClass}`} />;
    });

  // ⭐ Fetch services and find selected service
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // NOTE: Replace this with your actual category-specific API endpoint later
        const res = await fetch("/api/services"); 
        if (!res.ok) throw new Error("Network response was not ok");
        
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.services || [];
        setServices(list);

        const decodedName = decodeURIComponent(serviceName || "").trim();

        // Use includes() for flexible matching
        const found = list.find(
          (s) => normalize(s.title).includes(normalize(decodedName))
        );
        
        setSelected(found);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        // Simulate a small delay for a cleaner loading experience
        setTimeout(() => setLoading(false), 300); 
      }
    };

    fetchServices();
  }, [serviceName]);

  if (loading) return <PageLoader />;
  if (!selected) return (
    <div className="flex flex-col items-center justify-center mt-20 p-6">
      <X className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-xl font-semibold text-gray-800">Service Not Found</p>
      <button 
        onClick={() => router.push('/')} 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );

  const reviewsArray = Array.isArray(selected.reviews) ? selected.reviews : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20"> {/* Add padding for the sticky footer */}
      
      {/* Top Banner Image */}
      <div className="relative w-full h-64 sm:h-80">
        <Image
          src={selected.image || "/images/default.jpg"}
          alt={selected.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* Back Button Overlay */}
        <button 
            onClick={() => router.back()}
            className="absolute top-4 left-4 p-2 bg-black/40 text-white rounded-full z-20 hover:bg-black/60 transition"
        >
            <X className="w-6 h-6 rotate-45" /> {/* Using X rotated as a clear back arrow */}
        </button>
      </div>

      {/* Service Info Card */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-6 sm:p-8 -mt-16 relative z-10"
        >
          {/* Title and Price Block */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{selected.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(selected.rating || 0)}
                <span className="text-sm text-gray-500">({reviewsArray.length} reviews)</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#2856c2] ml-4 flex-shrink-0">
              ₹{selected.price}
            </p>
          </div>

          {/* Description */}
          <div className="py-4 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About This Service</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{selected.description}</p>
          </div>
          
          {/* Main CTA - Opens Drawer for Options/Reviews */}
          <button
            onClick={() => setShowDrawer(true)}
            className="w-full mt-4 py-3 rounded-xl bg-blue-600 text-white text-lg font-bold shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5"/>
            View Details & Book
          </button>
        </motion.div>
      </div>
      
      {/* Customer Reviews Section */}
      {reviewsArray.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewsArray.slice(0, 4).map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {typeof rev === "object" ? (
                  <>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-base">{rev.user || "Sparky User"}</p>
                      <div className="flex items-center gap-1">
                        {renderStars(rev.rating || 5, "w-4 h-4")}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {rev.comment || "Excellent service, highly recommended!"}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-700">{rev}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* You May Also Like Section */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {services
            .filter((s) => s.title !== selected.title)
            .slice(0, 4)
            .map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                onClick={() =>
                  router.push(`/services/${encodeURIComponent(service.title.toLowerCase().replace(/\s/g, '-'))}`)
                }
                className="bg-white rounded-xl shadow cursor-pointer transition border border-gray-100 overflow-hidden"
              >
                <Image
                  src={service.image || "/images/default.jpg"}
                  alt={service.title}
                  width={200}
                  height={140}
                  className="w-full h-24 object-cover rounded-t-xl"
                />
                <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-bold text-[#2856c2]">₹{service.price}</p>
                        <div className="flex text-xs">
                            {renderStars(service.rating || 0, "w-3 h-3")}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>


      {/* --- Drawer (Bottom Sheet) for Detailed Booking --- */}
      <AnimatePresence>
        {showDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
            />

            {/* Sliding Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header with Close */}
              <div className="sticky top-0 bg-white flex justify-between items-center p-5 border-b shadow-sm rounded-t-3xl">
                <h2 className="text-xl font-bold text-gray-900">{selected.title}</h2>
                <button onClick={() => setShowDrawer(false)} className="p-2 text-gray-500 hover:text-black transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content (Detailed Description/Options) */}
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={selected.image || "/images/default.jpg"}
                      alt={selected.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">What's Included?</h3>
                      <div className="mt-1 flex items-center gap-1">
                        {renderStars(selected.rating || 0, "w-4 h-4")}
                        <span className="text-gray-600 text-sm">
                          ({reviewsArray.length} Reviews)
                        </span>
                      </div>
                      <p className="mt-2 text-2xl font-extrabold text-[#2856c2]">₹{selected.price}</p>
                    </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-base">{selected.description}</p>
                  
                  {/* Features/Highlights (Example Mock) */}
                  <div className="pt-2">
                    <h3 className="text-md font-bold mb-3 text-gray-800">Key Features:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Professional-grade tools and products used.</li>
                      <li className="flex items-start text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> 100% satisfaction guarantee.</li>
                      <li className="flex items-start text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Certified and verified service provider.</li>
                      {/* Add more dynamic features here */}
                    </ul>
                  </div>

                  {/* Reviews inside the drawer for immediate detail check */}
                  {reviewsArray.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <h3 className="text-md font-bold mb-3 text-gray-800">Top Reviews</h3>
                      <div className="flex flex-col gap-3">
                        {reviewsArray.slice(0, 2).map((rev, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-gray-200 bg-gray-50"
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-semibold text-sm">{rev.user || "Anonymous"}</p>
                              <div className="flex items-center gap-1">
                                {renderStars(rev.rating || 5, "w-3 h-3")}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                              {rev.comment || "No comment provided."}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Footer: Action Button */}
              <div className="sticky bottom-0 p-5 border-t bg-white shadow-top">
                <button
                  onClick={() => addToCart(selected)}
                  className="w-full py-4 rounded-xl bg-blue-600 text-white text-lg font-bold shadow-2xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6"/>
                  Book Now (₹{selected.price})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Sticky CTA bar (when drawer is closed) */}
      <AnimatePresence>
        {!showDrawer && (
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-3xl z-30"
            >
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-gray-900">Starting at</p>
                        <p className="text-2xl font-extrabold text-blue-600">₹{selected.price}</p>
                    </div>
                    <button
                        onClick={() => setShowDrawer(true)}
                        className="py-3 px-8 rounded-xl bg-blue-600 text-white text-lg font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5"/>
                        Book Service
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}